import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/repository-modules/database.module' 
import { RedisModule } from './infrastructure/cache/redis-module/redis-module'
import { OrderRepositoryAdapter } from './infrastructure/database/adapters/order.repository.adapter'
import { OrderRepositoryModule } from './infrastructure/repository-modules/order.module'
import { ReviewRepositoryModule } from './infrastructure/repository-modules/review.module'
import { UserRepositoryModule } from './infrastructure/repository-modules/user.module'
import { ProductRepositoryModule } from './infrastructure/repository-modules/product.module'

@Module({
  imports: [
    DatabaseModule,
    RedisModule,
    OrderRepositoryModule,
    UserRepositoryModule,
    ReviewRepositoryModule,
    ProductRepositoryModule,
  ],
})
export class AppModule {}