import { CreateProduct, FindByNameAndMeasure, ProductRepository } from "src/domains/repositories/ProductRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Product } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaProductRepository implements ProductRepository {

    constructor(private readonly repository: PrismaRemoteRepository) {}

    async create({name, variant, measurementValue: measurementValue, measurementUnit, type, category, minStock}: CreateProduct): Promise<Product> {
        return this.repository.product.create({
            data:  {
                name,
                variant,
                measurementValue,
                measurementUnit,
                type,  
                category, 
                minStock
            }
        }); 

    }

    async findByNameAndMeasure({name, measurementValue, measurementUnit}: FindByNameAndMeasure): Promise<Product | null> {
        return this.repository.product.findUnique({
            where: {
                name_measurementValue_measurementUnit: {
                    name,
                    measurementValue,
                    measurementUnit
                }
            }
        });
    }

}