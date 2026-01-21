import { Injectable } from "@nestjs/common";
import { SupplyMovement } from "@prisma/client";
import { CreateSupplyMovement, GetCurrentStockBySupplyId, SupplyMovementRepository } from "src/domains/repositories/SupplyMovementRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";

@Injectable()
export class PrismaSupplyMovementRepository implements SupplyMovementRepository {
    constructor(private readonly prisma: PrismaRemoteRepository) {}

    async create({ type, supplyId, quantity, unitCost, userId, description, originMovementId }: CreateSupplyMovement): Promise<SupplyMovement> {
        return this.prisma.supplyMovement.create({
            data: {
                type,
                supplyId,
                quantity,
                unitCost,
                userId,
                description,
                originMovementId,
            },
        });
    }

    async getCurrentStockBySupplyId({ supplyId }: GetCurrentStockBySupplyId): Promise<number> {
        const entries = await this.prisma.supplyMovement.aggregate({
            where: { supplyId, type: 'ENTRY', deletedAt: null},
            _sum: { quantity: true },
        });

        const exits = await this.prisma.supplyMovement.aggregate({
            where: { supplyId, type: 'EXIT', deletedAt: null},
            _sum: { quantity: true },
        });

        const adjusts = await this.prisma.supplyMovement.aggregate({
            where: { supplyId, type: 'ADJUST', deletedAt: null},
            _sum: { quantity: true },
        });

        return (entries._sum.quantity ?? 0) - (exits._sum.quantity ?? 0) + (adjusts._sum.quantity ?? 0);

    }
}