import { IPost } from '@api/entities/post/post.types.ts'
import { IComment } from '@api/entities/comment/comment.types.ts'

export interface IPostWithComments extends IPost {
	comments?: IComment[]
}

export interface SetCommentsActionPayload {
	postId: number
	comments: IComment[]
}

export interface FetchCommentsActionPayload {
	postId: number
}
