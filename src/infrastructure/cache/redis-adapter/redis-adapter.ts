import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { RedisRepositoryPort } from "src/core/ports/redis.port";

@Injectable()
export class RedisAdapter implements RedisRepositoryPort {
    private readonly client: Redis
    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASSWORD
        })
    }
    async set(key: string, value: string, ttl?: number): Promise<void> {
        try {
            if (!ttl) {
                await this.client.set(key, value)
                return;
            }
            await this.client.set(key, value, 'EX', ttl)
        } catch (error) {
            throw new Error("redis set operation failed", { cause: error })
        }
    }
    async get(key: string): Promise<string | null> {
        try {
            const val = await this.client.get(key)
            if (val == null) {
                return null
            }
            return val
        } catch (error) {
            throw new Error("redis get Operation failed", { cause: error })
        }
    }

    async del(key: string): Promise<boolean> {
        try {
            const remove = await this.client.del(key)
            if (remove == 0) {
                return false
            }
            return true
        } catch (error) {
            throw new Error("redis delete Operation failed", { cause: error })
        }
    }
    async exists(key: string): Promise<boolean> {
        try {
            const exist = await this.client.exists(key)
            if (exist == 0) {
                return false;
            }
            return true;
        } catch (error) {
            throw new Error("redis Exist Check Operation failed", { cause: error })
        }
    }
}