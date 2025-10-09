export interface PaginationRequest {
    page: number
    pageSize: number
    searchText?: string
}


export interface PaginationResponse<T> {
    rows: T[]
    totalCount: number
    currentPage: number
    totalPages: number
}