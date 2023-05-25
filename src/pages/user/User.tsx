import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './User.module.scss'
import defaultAvatar from '@assets/images/defaultAvatar.png'
import { Card } from 'react-bootstrap'
import { useAppSelector } from '@hooks/useAppSelector.ts'
import { MainLayout } from '@layouts/MainLayout'
import { useDispatch } from 'react-redux'
import {
	fetchPosts,
	fetchUser
} from '@store/reducers/userReducer/user.actions.ts'
import { Loader, Post } from '@components'
import { FetchStatus } from '@/types/fetchStatus.ts'
import { IPostWithComments } from '@store/reducers/mainReducer/main.types.ts'
import { fetchComments } from '@store/reducers/userReducer/user.actions.ts'

export const User: FC = () => {
	const params = useParams()

	const dispatch = useDispatch()

	const user = useAppSelector(state => state.user.user)
	const posts = useAppSelector(state => state.user.posts)
	const fetchUserStatus = useAppSelector(state => state.user.fetchUserStatus)
	const fetchPostsStatus = useAppSelector(state => state.user.fetchPostsStatus)
	const fetchCommentsStatus = useAppSelector(
		state => state.user.fetchCommentsStatus
	)

	const onOpenComments = (post: IPostWithComments) => {
		return () => {
			if (post.comments) return

			dispatch(
				fetchComments({
					postId: post.id
				})
			)
		}
	}

	useEffect(() => {
		const userId = parseInt(params.id as string)

		if (!user.id) {
			dispatch(fetchUser({ id: userId }))
			return
		}
		dispatch(fetchPosts({ userId }))
	}, [user])

	const fetchUserStatusFetching = fetchUserStatus === FetchStatus.FETCHING
	const fetchPostsStatusFetching = fetchPostsStatus === FetchStatus.FETCHING

	return (
		<MainLayout>
			<Link to='/'>Назад</Link>

			<Card className='mb-3'>
				{fetchUserStatusFetching ? (
					<div className={styles.userLoaderContainer}>
						<Loader />
					</div>
				) : (
					<>
						<Card.Title>
							<img
								className='m-2'
								src={defaultAvatar}
								alt='Картинка убежала('
								width={32}
								height={32}
							/>
							{user.email}
						</Card.Title>
						<Card.Text className='m-2'>
							Name: {user.name}
							<br />
							Username: {user.username}
						</Card.Text>
					</>
				)}
			</Card>
			{fetchPostsStatusFetching || posts.length === 0 ? (
				<div className={styles.loaderContainer}>
					<Loader />
				</div>
			) : (
				<>
					<h2>Посты:</h2>
					<div className={styles.postsContainer}>
						{posts.map(post => (
							<Post
								key={post.id}
								post={post}
								commentsFetchStatus={fetchCommentsStatus}
								onOpenComments={onOpenComments}
							/>
						))}
					</div>
				</>
			)}
		</MainLayout>
	)
}
