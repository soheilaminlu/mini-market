import { Product } from "src/core/domain/product";
import { DataSource } from "typeorm";
import { ProductOrmEntity } from "../orm-entities/product.model";
import { UserOrmEntity } from "../orm-entities/user.model";
import { OrderOrmEntity } from "../orm-entities/order.model";
import { OrderItemOrmEntity } from "../orm-entities/orderItem.model";
import { ReviewOrmEntity } from "../orm-entities/review.model";

const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'soheil1380',
    database: 'mini-market',
    entities: [ProductOrmEntity , UserOrmEntity , OrderOrmEntity , OrderItemOrmEntity , ReviewOrmEntity],
    synchronize: false,
});

async function seedProducts() {
    await dataSource.initialize();

    const productRepo = dataSource.getRepository(ProductOrmEntity);

    const products = Array.from({ length: 30 }).map((_, i) =>
        productRepo.create({
            title: `Product ${i + 1}`,
            price: Math.floor(Math.random() * 1000),
            stock: Math.floor(Math.random() * 50),
            is_active: true,
            created_at: new Date(),
        })
    );

    await productRepo.save(products);

    console.log('Seeded products successfully!');
    await dataSource.destroy();
}
seedProducts();