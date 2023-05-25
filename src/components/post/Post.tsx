import { FC } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import styles from './Post.module.scss'
import defaultAvatar from '@/assets/images/defaultAvatar.png'
import { PostProps } from '@components/post/Post.types.ts'
import { FetchStatus } from '@/types/fetchStatus.ts'
import { Loader } from '@components'

export const Post: FC<PostProps> = ({
	post,
	commentsFetchStatus,
	onOpenComments
}) => {
	const fetchCommentsIsFetching = commentsFetchStatus === FetchStatus.FETCHING

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
						<Accordion.Body onEnter={onOpenComments?.(post)}>
							{!post.comments &&
								!fetchCommentsIsFetching &&
								'Комментарии отсутствуют'}
							{post.comments && !fetchCommentsIsFetching ? (
								<div className={styles.commentsContainer}>
									{post.comments.map(comment => (
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
