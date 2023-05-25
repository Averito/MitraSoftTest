import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
	IPostWithComments,
	SetCommentsActionPayload
} from '@store/reducers/mainReducer/main.reducer.types.ts'
import { IPost } from '@api/entities/post/post.types.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'

const mainSlice = createSlice({
	name: 'main',
	initialState: {
		posts: [] as IPostWithComments[],
		fetchPostsStatus: FetchStatus.FETCHED,
		fetchCommentsStatus: FetchStatus.FETCHED,
		currentPage: 1,
		pageSize: 5,
		totalPosts: 0
	},
	reducers: {
		toPage(state, { payload }: PayloadAction<number>) {
			state.currentPage = payload
		},
		setComments(state, { payload }: PayloadAction<SetCommentsActionPayload>) {
			const post = state.posts.find(post => post.id === payload.postId)
			if (!post) return

			post.comments = payload.comments
		},
		setPosts(state, { payload }: PayloadAction<IPost[]>) {
			state.posts = payload
		},
		setFetchPostsStatus(state, { payload }: PayloadAction<FetchStatus>) {
			state.fetchPostsStatus = payload
		},
		setFetchCommentsStatus(state, { payload }: PayloadAction<FetchStatus>) {
			state.fetchCommentsStatus = payload
		},
		setTotalPosts(state, { payload }: PayloadAction<number>) {
			state.totalPosts = payload
		}
	}
})

export const mainReducer = mainSlice.reducer
export const {
	toPage,
	setComments,
	setPosts,
	setFetchPostsStatus,
	setTotalPosts,
	setFetchCommentsStatus
} = mainSlice.actions
