import { Injectable } from "@nestjs/common";
import { Product, PRODUCT_CATEGORY, PRODUCT_TYPE, UNIT_TYPE } from "@prisma/client";
import { ProductRepository } from "src/domains/repositories/ProductRepository";
import { ProductAlreadyExists } from "src/shared/errors/cases/ProductAlreadyExists";

interface Request {
    name: string;
    variant?: string;
    measurementValue: number;
    measurementUnit: UNIT_TYPE;
    type: PRODUCT_TYPE;
    category: PRODUCT_CATEGORY;
    minStock?: number;
}

type Response = Product;

@Injectable()
export class CreateProductUseCase {
    constructor(private readonly productRepository: ProductRepository){}

    async execute({name, variant, measurementValue, measurementUnit, type, category, minStock}: Request): Promise<Response> {
        const normalizedName = name.trim();
        const normalizedVariant = variant?.trim();
        
        const productByNameAndMeasure = await this.productRepository.findByNameAndMeasure({
            name: normalizedName,
            measurementValue,
            measurementUnit
        });

        if(productByNameAndMeasure) {
            throw new ProductAlreadyExists();
        }

        return await this.productRepository.create({
            name: normalizedName,
            variant: normalizedVariant,
            measurementValue,
            measurementUnit,
            type,
            category,
            minStock
        });
    }
}