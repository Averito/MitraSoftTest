import axios from 'axios'

import { JSONPLACEHOLDER_URI } from '@/variables'
import { post } from '@api/entities/post'
import { comment } from '@api/entities/comment'
import { user } from '@api/entities/user'

export const axiosInstance = axios.create({
	baseURL: JSONPLACEHOLDER_URI
})

export const api = {
	post,
	comment,
	user
}
