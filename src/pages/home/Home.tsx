import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import styles from './Home.module.scss'
import { MainLayout } from '@layouts/MainLayout'
import { useAppSelector } from '@hooks/useAppSelector.ts'
import {
	fetchComments,
	fetchPosts
} from '@store/reducers/mainReducer/main.actions.ts'
import { Loader, Pagination, Post } from '@components'
import { FetchStatus } from '@/types/fetchStatus.ts'
import { toPage } from '@store/reducers/mainReducer/main.reducer.ts'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { useInput } from '@hooks/useInput.ts'
import { IPostWithComments } from '@store/reducers/mainReducer/main.types.ts'

export const Home: FC = () => {
	const dispatch = useDispatch()

	const posts = useAppSelector(state => state.main.posts)
	const fetchPostsStatus = useAppSelector(state => state.main.fetchPostsStatus)
	const fetchCommentsStatus = useAppSelector(
		state => state.main.fetchCommentsStatus
	)
	const currentPage = useAppSelector(state => state.main.currentPage)
	const pageSize = useAppSelector(state => state.main.pageSize)
	const totalPosts = useAppSelector(state => state.main.totalPosts)

	useEffect(() => {
		if (posts.length > 0) return
		dispatch(fetchPosts())
	}, [])

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

	const onChangePagination = (page: number) => {
		dispatch(toPage(page))
	}

	const [search, onChangeSearch, setSearch] = useInput()

	const onClickResetSearch = () => {
		setSearch('')
	}

	const [filteredPosts, setFilteredPosts] = useState(posts)

	const onClickSortPosts = () => {
		const postsCopy: IPostWithComments[] = JSON.parse(JSON.stringify(posts))

		setFilteredPosts(() =>
			postsCopy.sort((post1, post2) => {
				const nameA = post1.title.toLowerCase()
				const nameB = post2.title.toLowerCase()

				if (nameA < nameB) return -1
				if (nameA > nameB) return 1

				return 0
			})
		)
	}

	useEffect(() => {
		setFilteredPosts(() =>
			posts.filter(post =>
				post.title.toLowerCase().includes(search.toLowerCase())
			)
		)
	}, [search, posts])

	const fetchPostsStatusFetching = fetchPostsStatus === FetchStatus.FETCHING

	return (
		<MainLayout>
			<InputGroup className='mb-3'>
				<Form.Control
					value={search}
					onChange={onChangeSearch}
					placeholder='Поиск'
				/>
				<Button variant='outline-secondary' onClick={onClickResetSearch}>
					X
				</Button>
			</InputGroup>
			<Button
				className='mb-3'
				variant='outline-primary'
				onClick={onClickSortPosts}
			>
				Сортировать
			</Button>
			{fetchPostsStatusFetching ? (
				<div className={styles.loaderContainer}>
					<Loader />
				</div>
			) : (
				<div className={styles.postsContainer}>
					{filteredPosts.map(post => (
						<Post
							key={post.id}
							post={post}
							commentsFetchStatus={fetchCommentsStatus}
							onOpenComments={onOpenComments}
						/>
					))}
				</div>
			)}
			{posts.length > 0 && (
				<div className={styles.paginationContainer}>
					<Pagination
						currentPage={currentPage}
						pageSize={pageSize}
						disabled={fetchPostsStatusFetching}
						totalItems={totalPosts}
						onChange={onChangePagination}
					/>
				</div>
			)}
		</MainLayout>
	)
}
