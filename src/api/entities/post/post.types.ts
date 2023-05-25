import { QueryObject } from '@helpers/generateQueryString.ts'

export interface IPost {
	userId: number
	id: number
	title: string
	body: string
}

export interface GetAllPostsParams extends QueryObject {
	userId?: number | number[]
}
