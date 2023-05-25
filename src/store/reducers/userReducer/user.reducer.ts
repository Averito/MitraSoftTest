import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '@api/entities/user/user.types.ts'
import {
	IPostWithComments,
	SetCommentsActionPayload
} from '@store/reducers/mainReducer/main.types.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {} as IUser,
		posts: [] as IPostWithComments[],
		fetchUserStatus: FetchStatus.FETCHED,
		fetchPostsStatus: FetchStatus.FETCHED,
		fetchCommentsStatus: FetchStatus.FETCHED
	},
	reducers: {
		setComments(state, { payload }: PayloadAction<SetCommentsActionPayload>) {
			const post = state.posts.find(post => post.id === payload.postId)
			if (!post) return

			post.comments = payload.comments
		},
		setUser(state, { payload }: PayloadAction<IUser>) {
			state.user = payload
		},
		setPosts(state, { payload }: PayloadAction<IPostWithComments[]>) {
			state.posts = payload
		},
		setFetchUserStatus(state, { payload }: PayloadAction<FetchStatus>) {
			state.fetchUserStatus = payload
		},
		setFetchPostsStatus(state, { payload }: PayloadAction<FetchStatus>) {
			state.fetchPostsStatus = payload
		},
		setFetchCommentsStatus(state, { payload }: PayloadAction<FetchStatus>) {
			state.fetchCommentsStatus = payload
		}
	}
})

export const userReducer = userSlice.reducer
export const {
	setUser,
	setFetchUserStatus,
	setFetchCommentsStatus,
	setFetchPostsStatus,
	setPosts,
	setComments
} = userSlice.actions
