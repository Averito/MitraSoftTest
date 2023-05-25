import { QueryObject } from '@helpers/generateQueryString.ts'
import { DefaultParamsPartial } from '@api/types.ts'

export interface IPost {
	userId: number
	id: number
	title: string
	body: string
}

export interface GetAllPostsParams extends DefaultParamsPartial, QueryObject {
	userId?: number | number[]
}
