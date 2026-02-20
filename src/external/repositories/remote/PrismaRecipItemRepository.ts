import { Injectable } from "@nestjs/common";
import { RecipItem} from "@prisma/client";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { CreateRecipItem, FindByProductAndSupply, RecipItemRepository } from "src/domains/repositories/RecipItemRepository";


@Injectable()
export class PrismaRecipItemRepository implements RecipItemRepository {
    constructor(private readonly repository: PrismaRemoteRepository) {}

    create({productId, supplyId, quantity}: CreateRecipItem): Promise<RecipItem> {
        return this.repository.recipItem.create({
            data:{
                productId, 
                supplyId, 
                quantity
            },
        });
    }

    findByProductAndSupply({ productId, supplyId }: FindByProductAndSupply): Promise<RecipItem | null> {
        return this.repository.recipItem.findUnique({
            where: {
                productId_supplyId:{
                    productId,
                    supplyId
                }
            }
        });
    }
} 