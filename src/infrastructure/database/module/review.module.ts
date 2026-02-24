import { REVIEW_REPOSITORY } from "src/core/ports/review.port";
import { ReviewRepositoryAdapter } from "../adapters/review.repository.adapter";
import { Module } from "@nestjs/common";



@Module({
   providers: [{
    provide: REVIEW_REPOSITORY,
    useClass: ReviewRepositoryAdapter
   }],
   exports: [REVIEW_REPOSITORY]
})
export class ReviewRepositoryModule {}