import { RootState } from '@store'

export const getPageSize = (state: RootState) => state.main.pageSize
export const getTotalPosts = (state: RootState) => state.main.totalPosts
