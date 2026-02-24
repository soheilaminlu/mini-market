import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/module/database.module' 
import { RedisModule } from './infrastructure/cache/redis-module/redis-module'
import { OrderRepositoryAdapter } from './infrastructure/database/adapters/order.repository.adapter'
import { OrderRepositoryModule } from './infrastructure/database/module/order.module'
import { ReviewRepositoryModule } from './infrastructure/database/module/review.module'
import { UserRepositoryModule } from './infrastructure/database/module/user.module'
import { ProductRepositoryModule } from './infrastructure/database/module/product.module'

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