import { CreateMovement, MovementRepository } from "src/domains/repositories/MovementRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Movement } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaMovementRepository implements MovementRepository {
    constructor(private readonly repository: PrismaRemoteRepository) {}

    async create({ 
        type, 
        productId, 
        quantity, 
        unitCost, 
        unitSalePrice, 
        userId, 
        description }: CreateMovement): Promise<Movement> {
        return await this.repository.movement.create({
            data: {
                type,
                productId,
                quantity,
                unitCost,
                unitSalePrice,
                userId,
                description
            }
        });
    }

    async getCurrentStock(productId: string): Promise<number> {
        const entries = await this.repository.movement.aggregate({
            where: { productId, type: 'ENTRY', deletedAt: null},
            _sum: { quantity: true },
        });

        const exits = await this.repository.movement.aggregate({
            where: { productId, type: 'EXIT', deletedAt: null},
            _sum: { quantity: true },
        });

        const adjusts = await this.repository.movement.aggregate({
            where: { productId, type: 'ADJUST', deletedAt: null},
            _sum: { quantity: true },
        });

        return (entries._sum.quantity ?? 0) - (exits._sum.quantity ?? 0) + (adjusts._sum.quantity ?? 0);
        
    }
}