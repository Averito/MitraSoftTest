import { createAction } from '@reduxjs/toolkit'
import { FetchCommentsActionPayload } from '@store/reducers/mainReducer/main.types.ts'

export const fetchPosts = createAction('main/fetchPosts')
export const fetchComments =
	createAction<FetchCommentsActionPayload>('main/fetchComments')
