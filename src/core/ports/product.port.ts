
import { Product } from "../domain/Product"


export interface ProductRepositoryPorts {
    save(product:Product) : Promise<void>
    getAllProducts() : Promise<Product[] | []>
    getProductById(id:string) : Promise<Product | null>
    deleteProductById(id:string) : Promise<boolean>
}