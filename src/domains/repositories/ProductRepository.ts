import { Product, PRODUCT_CATEGORY, PRODUCT_TYPE, UNIT_TYPE } from "@prisma/client";

export interface CreateProduct {
    name: string;
    variant?: string;
    measurementValue: number;
    measurementUnit: UNIT_TYPE;
    type: PRODUCT_TYPE;
    category: PRODUCT_CATEGORY;
    minStock?: number;
}

export interface FindByNameAndMeasure {
    name: string;
    measurementValue: number;
    measurementUnit: UNIT_TYPE;
}

export abstract class ProductRepository {
    public abstract create(product: CreateProduct): Promise<Product>;
    public abstract findByNameAndMeasure(product: FindByNameAndMeasure): Promise<Product | null>;
}