import { User } from "../domain/user"

export const USER_REPOSITORY = Symbol('USER_REPOSITORY')


export interface UserQueryOptions {
    withOrders?: boolean,
    withReviews?: boolean,
    fromDate?:Date
    toDate?:Date
}
export interface PaginatedResult {
    data: User[]
    total:number
    limit:number
    page:number
    totalPages:number
}

export interface UserInformations {
    totalOrders:number
    totalreviews:number
    lastOrderDate:Date
}
export interface UserRepositoryPort {
    save(user: User): Promise<void>
    getAllUsers(): Promise<User[] | []>
    getUserById(id: string): Promise<User | null>
    getUserByEmail(email:string) : Promise<User | null>
    deleteUserById(id: string): Promise<boolean>
}