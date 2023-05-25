import { call, delay, put, takeEvery } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import {
	setComments,
	setFetchCommentsStatus,
	setFetchPostsStatus,
	setFetchUserStatus,
	setPosts,
	setUser
} from '@store/reducers/userReducer/user.reducer.ts'
import { api } from '@api'
import { IPost } from '@api/entities/post/post.types.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'
import { FetchCommentsActionPayload } from '@store/reducers/mainReducer/main.types.ts'
import { IComment } from '@api/entities/comment/comment.types.ts'
import {
	fetchUser,
	fetchPosts,
	fetchComments
} from '@store/reducers/userReducer/user.actions.ts'
import {
	FetchPostsPayload,
	FetchUserPayload
} from '@store/reducers/userReducer/user.types.ts'
import { IUser } from '@api/entities/user/user.types.ts'

export function* workerFetchUserSaga({
	payload
}: PayloadAction<FetchUserPayload>) {
	yield put(setFetchUserStatus(FetchStatus.FETCHING))
	const user: IUser = yield call(api.user.getById, {
		id: payload.id
	})
	yield delay(2000)
	yield put(setFetchUserStatus(FetchStatus.FETCHED))

	yield put(setUser(user))
}

export function* workerFetchPostsSaga({
	payload
}: PayloadAction<FetchPostsPayload>) {
	yield put(setFetchPostsStatus(FetchStatus.FETCHING))
	const posts: IPost[] = yield call(api.post.all, {
		userId: payload.userId
	})
	yield delay(2000)
	yield put(setFetchPostsStatus(FetchStatus.FETCHED))

	yield put(setPosts(posts))
}

export function* workerSetCommentsSaga({
	payload
}: PayloadAction<FetchCommentsActionPayload>) {
	yield put(setFetchCommentsStatus(FetchStatus.FETCHING))
	const comments: IComment[] = yield call(api.comment.all, {
		postId: payload.postId
	})
	yield delay(500)
	yield put(setFetchCommentsStatus(FetchStatus.FETCHED))

	yield put(
		setComments({
			postId: payload.postId,
			comments
		})
	)
}

function* userWatcherSaga() {
	yield takeEvery(fetchUser, workerFetchUserSaga)
	yield takeEvery(fetchPosts, workerFetchPostsSaga)
	yield takeEvery(fetchComments, workerSetCommentsSaga)
}

export default userWatcherSaga
