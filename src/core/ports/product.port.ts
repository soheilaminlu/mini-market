
import { Product } from "../domain/product" 

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY')

export interface ProductFilterOptions {
    maxRating?:number
    minRating?:number
    maxPrice?:number
    minPrice?:number
    is_active:boolean
}

export type ProductSortType = 'newest' | 'price' | 'rating'

export interface ProductSortOptions {
   sort_by?:ProductSortType
   sort_type?: 'ASC' | 'DESC'
}

export interface ProductListItems {
    id: string;
    title: string;
    price: number;
    stock: number;
    is_active: boolean;
    created_at: Date;
    averageRating: number;
    totalReviews: number;
}

export interface ProductPaginationOptions {
    page: number;
    limit: number;
}

export interface ProductPaginationMeta {
    page: number;          
    limit: number;                 
    filtered_total: number; 
    total_pages: number;  
    has_next: boolean; 
    has_previous: boolean;
}

export interface ProductPaginationResult {
    data: ProductListItems[]
    pagination: ProductPaginationMeta
    applied : {
        filter: ProductFilterOptions,
        sort: ProductSortOptions
    }
}

export interface ProductRepositoryPorts {
    getAllProducts(
        pagination: ProductPaginationOptions,
        filter:ProductFilterOptions,
        sort:ProductSortOptions
    ) : Promise<ProductPaginationResult>
    getProductById(id:string) : Promise<ProductListItems | null>
    deleteProductById(id:string) : Promise<boolean>
    save(product: Product): Promise<void>
}