import { Injectable } from "@nestjs/common";
import { PRODUCT_TYPE, RecipItem } from "@prisma/client";
import { ProductRepository } from "src/domains/repositories/ProductRepository";
import { RecipItemRepository } from "src/domains/repositories/RecipItemRepository";
import { SupplyRepository } from "src/domains/repositories/SupplyRepository";
import { CreateRecipItemDTO } from "src/shared/dtos/recipItem/CreateRecipItemDTO";
import { ProductCannotHaveRecipe } from "src/shared/errors/cases/ProductCannotHaveRecipe";
import { ProductNotFound } from "src/shared/errors/cases/ProductNotFound";
import { RecipItemAlreadyExists } from "src/shared/errors/cases/RecipItemAlreadyExists";
import { SupplyNotFound } from "src/shared/errors/cases/SupplyNotFound";

type Response = RecipItem;

@Injectable()
export class CreateRecipItemUseCase {
    constructor(
        private readonly recipItemRepository: RecipItemRepository,
        private readonly productRepository: ProductRepository,
        private readonly supplyRepository: SupplyRepository
    ){}

    async execute({productId, supplyId, quantity}: CreateRecipItemDTO): Promise<Response>{
        const product = await this.productRepository.findById({
            id: productId
        });
        if(!product){
            throw new ProductNotFound();
        }

        if(product.type !== PRODUCT_TYPE.PREPARED){
            throw new ProductCannotHaveRecipe()
        }

        const supply = await this.supplyRepository.findById({
            id: supplyId
        });
        if(!supply){
            throw new SupplyNotFound();
        }

        const exists = await this.recipItemRepository.findByProductAndSupply({
            productId, 
            supplyId
        });
        if(exists){
            throw new RecipItemAlreadyExists();
        }

        return this.recipItemRepository.create({
            productId,
            supplyId,
            quantity
        });
    }
}