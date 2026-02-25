import { ReviewRepositoryAdapter } from "src/infrastructure/database/adapters/review.repository.adapter";
import { ReviewRepositoryModule } from "src/infrastructure/repository-modules/review.module";
import { ReviewControllers } from "src/presentation/controlletrs/review.controllers";
import { CreateReviewUsecase } from "../review-usecases/create.review.usecase";
import { Module } from "@nestjs/common";


@Module({
    imports: [ReviewRepositoryModule],
    controllers: [ReviewControllers],
    providers: [CreateReviewUsecase,]
})
export class OrderModule { }