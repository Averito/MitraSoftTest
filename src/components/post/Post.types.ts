import { IPostWithComments } from '@store/reducers/mainReducer/main.types.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'

export interface PostProps {
	post: IPostWithComments
	onOpenComments?: (
		post: IPostWithComments
	) => (node: HTMLElement, isAppearing: boolean) => void
	commentsFetchStatus?: FetchStatus
}
