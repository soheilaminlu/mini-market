import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { Review } from "src/core/domain/review";
import { PRODUCT_REPOSITORY, type ProductRepositoryPorts } from "src/core/ports/product.port";
import { REVIEW_REPOSITORY, type ReviewRepositoryPort } from "src/core/ports/review.port";
import type { UserRepositoryPort } from "src/core/ports/user.port";
import { CreateReviewDto, ReviewResponseDto } from "src/presentation/dtos/review.dto";

@Injectable()
export class CreateReviewUsecase {
    private readonly reviewRepo: ReviewRepositoryPort
    private readonly productRepo: ProductRepositoryPorts
    constructor(@Inject(REVIEW_REPOSITORY) reviewRepo: ReviewRepositoryPort, @Inject(PRODUCT_REPOSITORY) productRepo: ProductRepositoryPorts) {
        this.reviewRepo = reviewRepo
        this.productRepo = productRepo
    }
    async execute(product_id: string, input: CreateReviewDto): Promise<ReviewResponseDto> {
        try {
            const product = await this.productRepo.getProductById(product_id)
            if (!product) {
                throw new BadRequestException("Product Not Found for Create review")
            }
            const review = new Review({
                id: crypto.randomUUID(),
                createdAt: new Date(),
                comment: input.comment,
                productId: product.id,
                rating: input.rating,
                userId: input.user_id
            })
            const validateRating = review.validateRaitng(input.rating)
            if (!validateRating) {
                throw new BadRequestException("Incorrect Input for rating")
            }
            await this.reviewRepo.save(review)
            const dto = review.toDto()
            return {
                id: dto.id,
                comment: dto.comment,
                createdAt: dto.createdAt,
                rating: input.rating,
                productId: dto.productId,
                userId: dto.userId
            }
        } catch (error) {
            throw new InternalServerErrorException(`Internal Server Error ${error.message}`)
        }
    }
}