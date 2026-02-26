import { Body, Controller, Param, Post } from "@nestjs/common";
import { CreateReviewUsecase } from "src/appliacation/review-usecases/create.review.usecase";
import { CreateReviewDto, ReviewResponseDto } from "../dtos/review.dto";
import { Review } from "src/core/domain/review";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";


@Controller('reviews')
export class ReviewControllers {
    private readonly createReviewUseCase: CreateReviewUsecase
    constructor(createReviewUseCase: CreateReviewUsecase) {
        this.createReviewUseCase = createReviewUseCase
    }
    @Post('products/:id/reviews')
    @ApiOperation({ summary: 'Create a Review' })
    @ApiResponse({ status: 201, description: 'Review Created' })
    async createReview(@Param('id') productId: string, @Body() createReviewDto: CreateReviewDto): Promise<ReviewResponseDto> {
        return await this.createReviewUseCase.execute(productId, createReviewDto)
    }
}