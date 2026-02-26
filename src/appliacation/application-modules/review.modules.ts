import { ReviewRepositoryAdapter } from "src/infrastructure/database/adapters/review.repository.adapter";
import { ReviewRepositoryModule } from "src/infrastructure/orm-modules/review.module";
import { ReviewControllers } from "src/presentation/controlletrs/review.controllers";
import { CreateReviewUsecase } from "../review-usecases/create.review.usecase";
import { Module } from "@nestjs/common";
import { ProductRepositoryModule } from "src/infrastructure/orm-modules/product.module";


@Module({
    imports: [ReviewRepositoryModule , ProductRepositoryModule],
    controllers: [ReviewControllers],
    providers: [CreateReviewUsecase,]
})
export class ReviewModule { }