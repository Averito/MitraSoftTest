import { createAction } from '@reduxjs/toolkit'
import { FetchCommentsActionPayload } from '@store/reducers/mainReducer/main.types.ts'
import {
	FetchPostsPayload,
	FetchUserPayload
} from '@store/reducers/userReducer/user.types.ts'

export const fetchPosts = createAction<FetchPostsPayload>('user/fetchPosts')
export const fetchComments =
	createAction<FetchCommentsActionPayload>('user/fetchComments')
export const fetchUser = createAction<FetchUserPayload>('user/fetchUser')
