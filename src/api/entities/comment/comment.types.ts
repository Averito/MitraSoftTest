import { QueryObject } from '@helpers/generateQueryString.ts'

export interface IComment {
	postId: number
	id: number
	name: string
	email: string
	body: string
}

export interface GetCommentsParams extends QueryObject {
	postId?: number
}
