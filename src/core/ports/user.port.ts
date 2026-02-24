import { User } from "../domain/user"


export interface UserRepositoryPort {
    save(user: User): Promise<void>
    getAllUsers(): Promise<User[] | []>
    getUserById(id: string): Promise<User | null>
    getUserByEmail(email:string) : Promise<User | null>
    deleteUserById(id: string): Promise<boolean>
}