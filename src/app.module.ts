import { Module } from '@nestjs/common'
import { DatabaseModule } from './infrastructure/database/module/database.module' 

@Module({
  imports: [DatabaseModule],
})
export class AppModule {}