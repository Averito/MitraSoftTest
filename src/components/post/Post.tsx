import { FC } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import styles from './Post.module.scss'
import defaultAvatar from '@/assets/images/defaultAvatar.png'
import { PostProps } from '@components/post/Post.types.ts'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '@hooks/useAppSelector.ts'
import { fetchComments } from '@store/reducers/mainReducer/main.actions.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'
import { Loader } from '@components'

export const Post: FC<PostProps> = ({ post }) => {
	const dispatch = useDispatch()
	const comments = useAppSelector(
		state => state.main.posts.find(post2 => post2.id === post.id)?.comments
	)
	const fetchCommentsStatus = useAppSelector(
		state => state.main.fetchCommentsStatus
	)

	const onOpenComments = () => {
		if (comments) return

		dispatch(
			fetchComments({
				postId: post.id
			})
		)
	}

	const fetchCommentsIsFetching = fetchCommentsStatus === FetchStatus.FETCHING

	return (
		<Card>
			<Card.Body>
				<Card.Title>
					<Link className={styles.avatarLink} to={`/users/${post.userId}`}>
						<img
							src={defaultAvatar}
							alt='Нет аватарки('
							width={32}
							height={32}
						/>
					</Link>

					{post.title}
				</Card.Title>
				<Card.Text>{post.body}</Card.Text>
				<Accordion className={styles.postComments}>
					<Accordion.Item eventKey='comments'>
						<Accordion.Header>Комментарии</Accordion.Header>
						<Accordion.Body onEnter={onOpenComments}>
							{!comments &&
								!fetchCommentsIsFetching &&
								'Комментарии отсутствуют'}
							{comments && !fetchCommentsIsFetching ? (
								<div className={styles.commentsContainer}>
									{comments.map(comment => (
										<Card key={comment.id}>
											<Card.Title>{comment.email}</Card.Title>
											<Card.Text>{comment.body}</Card.Text>
										</Card>
									))}
								</div>
							) : (
								<div className={styles.loaderContainer}>
									<Loader></Loader>
								</div>
							)}
						</Accordion.Body>
					</Accordion.Item>
				</Accordion>
			</Card.Body>
		</Card>
	)
}
