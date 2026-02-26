import { USER_REPOSITORY } from "src/core/ports/user.port";
import { UserRepositoryAdapter } from "../database/adapters/user.repository.adapter";
import { Module } from "@nestjs/common";
import { UserOrmEntity } from "../database/orm-entities/user.model";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
   imports: [TypeOrmModule.forFeature(
      [UserOrmEntity]
   )],
   providers: [{
      provide: USER_REPOSITORY,
      useClass: UserRepositoryAdapter
   }],

   exports: [USER_REPOSITORY]
})
export class UserRepositoryModule { }