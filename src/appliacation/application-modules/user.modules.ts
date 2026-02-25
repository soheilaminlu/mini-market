import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "src/infrastructure/repository-modules/user.module";
import { UserControllers } from "src/presentation/controlletrs/user.controllers";

@Module({
    imports: [UserRepositoryModule],
    controllers: [UserControllers],
    providers: [],
})
export class OrderModule { }