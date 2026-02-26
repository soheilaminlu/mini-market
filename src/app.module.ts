import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/orm-modules/database.module' 
import { RedisModule } from './infrastructure/cache/redis-module/redis-module'
import { OrderRepositoryAdapter } from './infrastructure/database/adapters/order.repository.adapter'
import { OrderRepositoryModule } from './infrastructure/orm-modules/order.module'
import { ReviewRepositoryModule } from './infrastructure/orm-modules/review.module'
import { UserRepositoryModule } from './infrastructure/orm-modules/user.module'
import { ProductRepositoryModule } from './infrastructure/orm-modules/product.module'
import { ProductModule } from './appliacation/application-modules/product.modules'
import { OrderModule } from './appliacation/application-modules/orders.modules'
import { UserModule } from './appliacation/application-modules/user.modules'
import { ReviewModule } from './appliacation/application-modules/review.modules'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    DatabaseModule,
    RedisModule,
    ProductModule,
    OrderModule,
    UserModule,
    ReviewModule
  ],
})
export class AppModule {}