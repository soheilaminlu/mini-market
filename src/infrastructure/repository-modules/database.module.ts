import { Module } from "@nestjs/common";
import {ConfigModule , ConfigService} from "@nestjs/config"
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserOrmEntity } from "../database/orm-entities/user.model";
import { ProductOrmEntity } from "../database/orm-entities/product.model";
import { OrderOrmEntity } from "../database/orm-entities/order.model";
import { ReviewOrmEntity } from "../database/orm-entities/review.model";

@Module({
    imports:[
         ConfigModule.forRoot(),
         TypeOrmModule.forRootAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory: (configService : ConfigService) : TypeOrmModuleOptions => {
                 const type = 'postgres'
                const host = configService.get<string>('DB_HOST')
                const password = configService.get<string>('DB_PASSWORD')
                const username = configService.get<string>('DB_USERNAME')
                const database = configService.get<string>('DB_NAME')
                const port = Number(configService.get('DB_PORT'))
                if (!host || !username || !password || !database || !port) {
                    throw new Error('Database config invalid! App cannot start.')
                }
                return {
                    type,
                    host,
                    port,
                    username,
                    password,
                    database,
                    entities: [UserOrmEntity, ProductOrmEntity, OrderOrmEntity, ReviewOrmEntity],
                    synchronize: false,
                    logging: true
                 }
             }
         })
    ],
    exports: [TypeOrmModule], 
})
export class DatabaseModule {}