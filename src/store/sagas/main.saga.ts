import { call, delay, put, select, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import {
	setComments,
	setFetchCommentsStatus,
	setFetchPostsStatus,
	setPosts,
	setTotalPosts,
	toPage
} from '@store/reducers/mainReducer/main.reducer.ts'
import { api } from '@api'
import { GetAllPostsParams, IPost } from '@api/entities/post/post.types.ts'
import {
	getPageSize,
	getTotalPosts
} from '@store/reducers/mainReducer/main.selectors.ts'
import {
	fetchComments,
	fetchPosts
} from '@store/reducers/mainReducer/main.actions.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'
import { FetchCommentsActionPayload } from '@store/reducers/mainReducer/main.reducer.types.ts'
import { IComment } from '@api/entities/comment/comment.types.ts'

export function* workerSaga({ payload }: PayloadAction<number | undefined>) {
	const pageSize: number = yield select(getPageSize)
	const totalPosts: number = yield select(getTotalPosts)

	const getAllPostsParams: GetAllPostsParams = {
		_limit: pageSize
	}

	if (payload) getAllPostsParams._page = payload

	yield put(setFetchPostsStatus(FetchStatus.FETCHING))
	const posts: IPost[] = yield call(api.post.all, getAllPostsParams)
	yield delay(2000)
	yield put(setFetchPostsStatus(FetchStatus.FETCHED))

	if (totalPosts === 0) {
		const allPosts: IPost[] = yield call(api.post.all)
		yield put(setTotalPosts(allPosts.length))
	}

	yield put(setPosts(posts))

	if (payload) return payload
}

export function* workerSetCommentsSaga({
	payload
}: PayloadAction<FetchCommentsActionPayload>) {
	yield put(setFetchCommentsStatus(FetchStatus.FETCHING))
	const comments: IComment[] = yield call(api.comment.all, {
		postId: payload.postId
	})
	yield delay(2000)
	yield put(setFetchCommentsStatus(FetchStatus.FETCHED))

	yield put(
		setComments({
			postId: payload.postId,
			comments
		})
	)
}

function* mainWatcherSaga() {
	yield takeEvery(toPage, workerSaga)
	yield takeEvery(fetchPosts, workerSaga)
	yield takeEvery(fetchComments, workerSetCommentsSaga)
}

export default mainWatcherSaga
