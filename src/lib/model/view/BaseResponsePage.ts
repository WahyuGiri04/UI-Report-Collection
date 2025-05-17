export interface BaseResponsePage<T> {
    content? : T
    pageSize : number
    totalData : number
    totalPages : number
}