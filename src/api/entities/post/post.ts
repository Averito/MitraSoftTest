import { IPost, GetAllPostsParams } from './post.types'
import { axiosInstance } from '@api'
import { generateQueryString } from '@helpers/generateQueryString'

export const post = {
	async all(params: GetAllPostsParams = {}): Promise<IPost[]> {
		const queryString = generateQueryString(params)

		const response = await axiosInstance.get<IPost[]>(`/posts${queryString}`)
		return response.data
	}
}
