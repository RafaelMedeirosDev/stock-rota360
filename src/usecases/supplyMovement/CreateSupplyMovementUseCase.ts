import { Injectable } from "@nestjs/common";
import { MOVEMENT_TYPE, SupplyMovement } from "@prisma/client";
import { SupplyMovementRepository } from "src/domains/repositories/SupplyMovementRepository";
import { InsufficientStock } from "src/shared/errors/cases/InsufficientStock";

type Request = {
    type: MOVEMENT_TYPE;
    supplyId: string;
    quantity: number;
    unitCost?: number;
    userId: string;
    description?: string;
    originMovementId?: string;
}

type Response = SupplyMovement;

@Injectable()
export class CreateSupplyMovementUseCase {
    constructor(private readonly supplyMovementRepository: SupplyMovementRepository) {}

    async execute({type, supplyId, quantity, unitCost, userId, description, originMovementId}: Request): Promise<Response> {
        if(type === MOVEMENT_TYPE.EXIT) {
            const currentStock =  await this.supplyMovementRepository.getCurrentStockBySupplyId({ supplyId });  

            if(currentStock < quantity) {
                throw new InsufficientStock();
            }
        }

        const supplyMovement = await this.supplyMovementRepository.create({
            type,
            supplyId,
            quantity,
            unitCost,
            userId,
            description,
            originMovementId
        });

        return supplyMovement;
    }
}