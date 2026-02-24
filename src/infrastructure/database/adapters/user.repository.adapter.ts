import { User } from "src/core/domain/user";
import { UserRepositoryPort } from "src/core/ports/user.port";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { Product } from "src/core/domain/product";
import { UserOrmEntity } from "../orm-entities/user.model";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryAdapter implements UserRepositoryPort {
    private readonly repo: Repository<UserOrmEntity>

    constructor(@InjectRepository(UserOrmEntity) repo: Repository<UserOrmEntity>) {
        this.repo = repo
    }

    async save(user: User): Promise<void> {
        try {
            const userEntity = this.maptoOrm(user)
            await this.repo.save(userEntity)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to save user ${error.message}`)
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.repo.find()
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch users ${error.message}`)
        }
    }

    async getUserById(id: string): Promise<User | null> {
        try {
            const user = await this.repo.findOne({ where: { id } })
            return user || null
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch user by id ${error.message}`)
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        try {
            const user = await this.repo.findOne({ where: { email } })
            return user || null
        } catch (error) {
            throw new InternalServerErrorException(`Failed to fetch user by email ${error.message}`)
        }
    }

    async deleteUserById(id: string): Promise<boolean> {
        try {
            const user = await this.repo.findOne({ where: { id } })
            if (!user) return false
            await this.repo.remove(user)
            return true
        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete user ${error.message}`)
        }
    }
    private maptoOrm(user: User): UserOrmEntity {
        const userOrm = new UserOrmEntity()
        return userOrm
    }
}