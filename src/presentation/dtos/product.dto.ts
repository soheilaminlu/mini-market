import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString, Min } from "class-validator";
import type { ProductSortType } from "src/core/ports/product.port";

export class GetProductsQueryDto {
    // Pagination
   @ApiPropertyOptional({ example: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page: number = 1;
    
    @ApiPropertyOptional({ example: 20 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit: number = 10;

    // Filters
    @ApiPropertyOptional({ example: 200 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minPrice?: number;

    @ApiPropertyOptional({ example: 1000 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxPrice?: number;

    @ApiPropertyOptional({ example: 2 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    minRating?: number;
    
    @ApiPropertyOptional({ example: 5 })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    maxRating?: number;
    
    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    is_active?: boolean;

    // Sorting
    @ApiPropertyOptional({ example: 'newest' })
    @IsOptional()
    @IsString()
    sort_by?: ProductSortType = 'newest'; // 'newest' | 'price' | 'rating'

    @ApiPropertyOptional({ example: 'DESC'})
    @IsOptional()
    @IsString()
    sort_type?: 'ASC' | 'DESC' = 'ASC';
}



export class CreateProductDto {

}