import { call, put, select, takeEvery, delay } from 'redux-saga/effects'
import {
	setFetchPostsStatus,
	setPosts,
	toPage
} from '@store/reducers/mainReducer/main.reducer.ts'
import { api } from '@api'
import { GetAllPostsParams, IPost } from '@api/entities/post/post.types.ts'
import { PayloadAction } from '@reduxjs/toolkit'
import { getPageSize } from '@store/reducers/mainReducer/main.selectors.ts'
import { fetchPosts } from '@store/reducers/mainReducer/main.actions.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'

export function* workerSaga({ payload }: PayloadAction<number | undefined>) {
	const pageSize: number = yield select(getPageSize)
	const getAllPostsParams: GetAllPostsParams = {
		_limit: pageSize
	}

	if (payload) getAllPostsParams._page = payload

	yield put(setFetchPostsStatus(FetchStatus.FETCHING))
	const posts: IPost[] = yield call(api.post.all, getAllPostsParams)
	yield delay(2000)
	yield put(setFetchPostsStatus(FetchStatus.FETCHED))

	yield put(setPosts(posts))

	if (payload) return payload
}

function* mainWatcherSaga() {
	yield takeEvery(toPage, workerSaga)
	yield takeEvery(fetchPosts, workerSaga)
}

export default mainWatcherSaga
