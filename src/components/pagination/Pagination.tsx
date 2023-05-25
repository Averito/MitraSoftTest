import { FC, MouseEventHandler, useMemo, useState } from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'

import { PaginationProps } from './Pagination.types.ts'

export const Pagination: FC<PaginationProps> = ({
	totalItems,
	pageSize,
	currentPage,
	disabled,
	onChange
}) => {
	const [paginationSliceFromStart, setPaginationSliceFromStart] =
		useState<number>(0)
	const [paginationSliceFromEnd, setPaginationSliceFromEnd] =
		useState<number>(4)

	const onClickPrevPage = () => {
		onChange?.(currentPage - 1)
	}

	const onClickNextPage = () => {
		onChange?.(currentPage + 1)
	}

	const onClickPage = (page: number): MouseEventHandler<HTMLDivElement> => {
		return () => {
			onChange?.(page)
		}
	}

	const onClickPrevEllipsis = () => {
		setPaginationSliceFromStart(prevState => prevState - 4)
		setPaginationSliceFromEnd(prevState => prevState - 4)
	}
	const onClickNextEllipsis = () => {
		setPaginationSliceFromStart(prevState => prevState + 4)
		setPaginationSliceFromEnd(prevState => prevState + 4)
	}

	const paginationArray = useMemo(() => {
		const pages: number[] = []

		for (let i = 1; i <= totalItems; i++) {
			if (totalItems - pageSize < i) {
				pages.push(Math.ceil(i / pageSize))
				break
			}
			if (i % pageSize === 0) pages.push(Math.ceil(i / pageSize))
		}

		return pages
	}, [totalItems])

	const paginationPrevButtonDisabled = currentPage === 1 || disabled
	const paginationNextButtonDisabled =
		currentPage * (pageSize - 1) >= totalItems || disabled

	const paginationPrevEllipsisDisabled =
		paginationSliceFromStart - 4 < 0 || disabled
	const paginationNextEllipsisDisabled =
		paginationSliceFromStart + 4 >= paginationArray.length || disabled

	return (
		<BootstrapPagination>
			<BootstrapPagination.Prev
				disabled={paginationPrevButtonDisabled}
				onClick={onClickPrevPage}
			/>

			{paginationSliceFromStart !== 0 && (
				<BootstrapPagination.Ellipsis
					onClick={onClickPrevEllipsis}
					disabled={paginationPrevEllipsisDisabled}
				/>
			)}

			{paginationArray
				.slice(paginationSliceFromStart, paginationSliceFromEnd)
				.map(page => (
					<BootstrapPagination.Item
						key={page}
						disabled={disabled}
						onClick={onClickPage(page)}
						active={currentPage === page}
					>
						{page}
					</BootstrapPagination.Item>
				))}

			{paginationSliceFromEnd < paginationArray.length && (
				<BootstrapPagination.Ellipsis
					onClick={onClickNextEllipsis}
					disabled={paginationNextEllipsisDisabled}
				/>
			)}

			<BootstrapPagination.Next
				disabled={paginationNextButtonDisabled}
				onClick={onClickNextPage}
			/>
		</BootstrapPagination>
	)
}
