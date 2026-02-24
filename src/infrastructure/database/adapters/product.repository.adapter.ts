import { Product } from "src/core/domain/product";
import { ProductRepositoryPorts } from "src/core/ports/product.port";
import { Repository } from "typeorm";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { InjectRepository } from "@nestjs/typeorm";



export class ProductRepositoryAdapter implements ProductRepositoryPorts {
    private readonly repo: Repository<ProductOrmEntity>
    constructor(@InjectRepository(ProductOrmEntity) repo: Repository<ProductOrmEntity>) {
        this.repo = repo
    }

    save(product: Product): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAllProducts(): Promise<Product[] | []> {
        throw new Error("Method not implemented.");
    }
    getProductById(id: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    deleteProductById(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private maptoOrm(product: Product): ProductOrmEntity {
        const productOrm = new ProductOrmEntity()
        return productOrm
    }
}