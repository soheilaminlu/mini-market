import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../orm-entities/user.model'; 
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { OrderOrmEntity } from '../orm-entities/order.model';
import { OrderItemOrmEntity } from '../orm-entities/orderItem.model';
import { ProductOrmEntity } from '../orm-entities/product.model';
import { ReviewOrmEntity } from '../orm-entities/review.model';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'soheil1380',
  database: 'mini-market',
  entities: [UserOrmEntity , OrderOrmEntity, OrderItemOrmEntity , ProductOrmEntity, ReviewOrmEntity],
  synchronize: false,
});

async function seedUsers() {
  await dataSource.initialize();

  const repo = dataSource.getRepository(UserOrmEntity);

  const hashedPassword = await bcrypt.hash('123456', 10);

  const users = Array.from({ length: 5 }).map((_, i) =>
    repo.create({
      id: randomUUID(),
      email: `user${i + 1}@example.com`,
      username: `user${i + 1}`,
      password: hashedPassword,
    }),
  );

  await repo.save(users);
  await dataSource.destroy();
}

seedUsers();