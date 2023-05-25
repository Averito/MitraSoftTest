import { IComment, GetCommentsParams } from './comment.types.ts'
import { axiosInstance } from '@api'
import { generateQueryString } from '@helpers/generateQueryString'

export const comment = {
	async all(params: GetCommentsParams): Promise<IComment[]> {
		const queryString = generateQueryString(params)

		const response = await axiosInstance.get<IComment[]>(`/comments${queryString}`)
		return response.data
	}
}
