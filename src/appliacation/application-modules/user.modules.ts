import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserOrmEntity } from "src/infrastructure/database/orm-entities/user.model";
import { UserController } from "src/presentation/controlletrs/user.controllers";

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
})
export class UserModule {}