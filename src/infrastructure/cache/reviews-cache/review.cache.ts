import { Inject, Injectable } from "@nestjs/common";
import { RedisAdapter } from "../redis-adapter/redis-adapter";
import { Review } from "src/core/domain/review";

@Injectable()
export class ReviewRedisCache {
    private readonly cacheRepository: RedisAdapter
    constructor(@Inject() cacheRepository: RedisAdapter) {
        this.cacheRepository = cacheRepository
    }
}