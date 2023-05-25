export interface PaginationProps {
	totalItems: number
	pageSize: number
	currentPage: number
	disabled?: boolean
	onChange?: (page: number) => void
}
