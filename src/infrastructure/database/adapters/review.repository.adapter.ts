import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReviewOrmEntity } from "../orm-entities/review.model";
import { ReviewRepositoryPort } from "src/core/ports/review.port";
import { Review } from "src/core/domain/review";
import { InternalServerErrorException } from "@nestjs/common";

export class ReviewRepositoryAdapter implements ReviewRepositoryPort {
    private readonly repo: Repository<ReviewOrmEntity>
    constructor(@InjectRepository(ReviewOrmEntity) repo: Repository<ReviewOrmEntity>) {
        this.repo = this.repo
    }
    async save(review: Review): Promise<void> {
        try {
            const reviewEntity = this.mapToOrm(review)
            await this.repo.save(reviewEntity)
        } catch (error) {
            throw new InternalServerErrorException(`failed to save review ${error.message}`);
        }
    }
    async getAllReviewsByProductId(product_id: string): Promise<Review[] | []> {
        try {
            const reviewsByProductId = await this.repo.find({ where: { product_id: product_id } })
            return reviewsByProductId
        } catch (error) {
            throw new InternalServerErrorException(`failed to get all reviews ${error.message}`);
        }
    }
    async getAllReviewsFromUser(user_id: string): Promise<Review[] | []> {
        try {
            const reviewByUser = await this.repo.find({ where: { user_id: user_id } })
            return reviewByUser
        } catch (error) {
            throw new InternalServerErrorException(`failed to get all reviews ${error.message}`);
        }
    }
    private mapToOrm(review: Review): ReviewOrmEntity {
        const reviewEntity = new ReviewOrmEntity()
        return reviewEntity
    }
}