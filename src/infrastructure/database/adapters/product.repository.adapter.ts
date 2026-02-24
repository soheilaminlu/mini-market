import { Product } from "src/core/domain/product";
import { ProductRepositoryPorts } from "src/core/ports/product.port";
import { Repository } from "typeorm";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { InjectRepository } from "@nestjs/typeorm";
import { InternalServerErrorException } from "@nestjs/common";



export class ProductRepositoryAdapter implements ProductRepositoryPorts {
    private readonly repo: Repository<ProductOrmEntity>
    constructor(@InjectRepository(ProductOrmEntity) repo: Repository<ProductOrmEntity>) {
        this.repo = repo
    }

    async save(product: Product): Promise<void> {
        try {
         const productEntity = this.maptoOrm(product)
         await this.repo.save(productEntity)
        } catch (error) {
           throw new InternalServerErrorException(`failed to save product ${error.message}`);
        }
    }
    async getAllProducts(): Promise<Product[] | []> {
        try {
            const products = await this.repo.find()
            return products
        } catch (error) {
            throw new InternalServerErrorException(`failed to find products list ${error.message}`);
        } 
    }
    async getProductById(id: string): Promise<Product | null> {
        try {
            const product = await this.repo.findOne(
                { where: { id } }
            )
            return product || null
        } catch (error) {
            throw new InternalServerErrorException(`failed to find product ${error.message}`);
        }
    }
    async deleteProductById(id: string): Promise<boolean> {
        try {
            const product = await this.repo.findOne({ where: { id } })
            if (!product) {
                return false
            }
            await this.repo.remove(product)
            return true
        } catch (error) {
            throw new InternalServerErrorException(`failed to delete product ${error.message}`);
        }
    }

    private maptoOrm(product: Product): ProductOrmEntity {
        const productOrm = new ProductOrmEntity()
        return productOrm
    }
}