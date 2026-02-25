import { BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { Review } from "src/core/domain/review";
import type { ProductRepositoryPorts } from "src/core/ports/product.port";
import { ReviewRepositoryPort } from "src/core/ports/review.port";
import type { UserRepositoryPort } from "src/core/ports/user.port";
import { CreateReviewDto } from "src/presentation/dtos/review.dto";

export class CreateReviewUsecase {
    private readonly reviewRepo: ReviewRepositoryPort
    private readonly productRepo: ProductRepositoryPorts
    constructor(reviewRepo: UserRepositoryPort, productRepo: ProductRepositoryPorts) {
        this.reviewRepo = this.reviewRepo
        this.productRepo = productRepo
    }
    async execute(product_id: string, input: CreateReviewDto) {
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
        return review;
        } catch (error) {
            throw new InternalServerErrorException(`Internal Server Error ${error.message}`)
        }
    }
}