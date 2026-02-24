import { Module, Global } from '@nestjs/common';
import { RedisAdapter } from '../redis-adapter/redis-adapter'; // adjust path as needed
import { REDIS_REPOSITORY } from 'src/core/ports/redis.port';

@Module({
  providers: [
    {
      provide: REDIS_REPOSITORY,
      useClass: RedisAdapter,
    },
  ],
  exports: [REDIS_REPOSITORY],
})
export class RedisModule {}