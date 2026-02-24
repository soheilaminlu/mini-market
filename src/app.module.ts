import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/module/database.module' 
import { RedisModule } from './infrastructure/cache/redis-module/redis-module'

@Module({
  imports: [
    DatabaseModule,
    RedisModule
  ],
})
export class AppModule {}