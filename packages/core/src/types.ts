export interface Pagination {
    page: number;
    perPage: number;
}

export interface Sort {
    field: string;
    order: string;
}

export interface Filter {
    [k: string]: any;
}

export interface ReduxState {}
