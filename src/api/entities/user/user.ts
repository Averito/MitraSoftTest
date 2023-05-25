import { axiosInstance } from '@api'
import { IUser, GetUserByIdParams } from './user.types.ts'

export const user = {
	async getById({ id }: GetUserByIdParams): Promise<IUser> {
		const response = await axiosInstance.get<IUser>(`/users/${id}`)
		return response.data
	}
}
