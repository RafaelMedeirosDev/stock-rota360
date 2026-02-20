import { Injectable } from "@nestjs/common";
import { Product, RecipItem, Supply } from "@prisma/client";

export interface CreateRecipItem{
    productId: string;
    supplyId: string;
    quantity: number
}

export interface FindByProductAndSupply{
    productId: string;
    supplyId: string;
}


@Injectable()
export abstract class RecipItemRepository {
    abstract create({productId, supplyId, quantity}: CreateRecipItem): Promise<RecipItem>;
    abstract findByProductAndSupply({productId, supplyId}: FindByProductAndSupply): Promise<RecipItem | null>;
}