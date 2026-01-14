import { Body, Controller, Post } from "@nestjs/common";
import { Product } from "@prisma/client";
import { CreateProductDTO } from "src/shared/dtos/product/CreateProductDTO";
import { CreateProductUseCase } from "src/usecases/product/CreateProductUseCase";

@Controller()
export class ProductController {
    constructor(private readonly createProductUseCase: CreateProductUseCase) { }

    @Post('/product')
    create(
        @Body() { name, variant, measurementValue, measurementUnit, type, category, minStock }:  CreateProductDTO   
    ): Promise<Product> {
        return this.createProductUseCase.execute({
            name,
            variant,
            measurementValue,
            measurementUnit,
            type,
            category,
            minStock
        });
    }
}