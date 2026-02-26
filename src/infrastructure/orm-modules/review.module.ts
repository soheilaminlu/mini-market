import { REVIEW_REPOSITORY } from "src/core/ports/review.port";
import { ReviewRepositoryAdapter } from "../database/adapters/review.repository.adapter";
import { Module } from "@nestjs/common";
import { ReviewOrmEntity } from "../database/orm-entities/review.model";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
   imports: [TypeOrmModule.forFeature(
      [ReviewOrmEntity]
   )],
   providers: [{
      provide: REVIEW_REPOSITORY,
      useClass: ReviewRepositoryAdapter
   }],
   exports: [REVIEW_REPOSITORY]
})
export class ReviewRepositoryModule {}