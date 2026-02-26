import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmEntity } from 'src/infrastructure/database/orm-entities/user.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('users')
export class UserController {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (for test)' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  async getAllUsers() {
    const users = await this.userRepo.find();
    return users.map(u => ({
      id: u.id,
      email: u.email,
      username: u.username,
      created_at: u.createdAt,
    }));
  }
}