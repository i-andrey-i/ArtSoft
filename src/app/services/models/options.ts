export interface PaginationOptions {
    offset?: number
    limit?: number
}

interface FilterOptions {
    search?: string
}

export type QueryOptions = PaginationOptions & FilterOptions