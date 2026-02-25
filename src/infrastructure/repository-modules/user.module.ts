import { USER_REPOSITORY } from "src/core/ports/user.port";
import { UserRepositoryAdapter } from "../database/adapters/user.repository.adapter";
import { Module } from "@nestjs/common";



@Module({
   providers: [{
    provide: USER_REPOSITORY,
    useClass: UserRepositoryAdapter
   }],
   
   exports: [USER_REPOSITORY]
})
export class UserRepositoryModule {}