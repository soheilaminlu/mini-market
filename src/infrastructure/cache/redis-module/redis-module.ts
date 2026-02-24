import { Module, Global } from '@nestjs/common';
import { RedisAdapter } from '../redis-adapter/redis-adapter'; // adjust path as needed
import { REDIS_REPOSITORY_PORT } from 'src/core/ports/redis.port';

@Module({
  providers: [
    {
      provide: REDIS_REPOSITORY_PORT,
      useClass: RedisAdapter,
    },
  ],
  exports: [REDIS_REPOSITORY_PORT],
})
export class RedisModule {}