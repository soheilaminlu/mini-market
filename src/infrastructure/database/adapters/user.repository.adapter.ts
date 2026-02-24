import { User } from "src/core/domain/user";
import { UserRepositoryPort } from "src/core/ports/user.port";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { Product } from "src/core/domain/product";
import { UserOrmEntity } from "../orm-entities/user.model";

export class UserRepositoryAdapter implements UserRepositoryPort {
    constructor() {
    }
    save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAllUsers(): Promise<User[] | []> {
        throw new Error("Method not implemented.");
    }
    getUserById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    getUserByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    deleteUserById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private maptoOrm(product: User) : UserOrmEntity {
     const userOrm = new UserOrmEntity()
     return userOrm
    }
}