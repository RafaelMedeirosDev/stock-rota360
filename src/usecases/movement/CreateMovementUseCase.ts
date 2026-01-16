import { Injectable } from "@nestjs/common";
import { Movement, MOVEMENT_TYPE } from "@prisma/client";
import { MovementRepository } from "src/domains/repositories/MovementRepository";
import { InsufficientStock } from "src/shared/errors/cases/InsufficientStock";

interface Request {
    type: MOVEMENT_TYPE;
    productId: string;
    quantity: number;
    unitCost?: number;
    unitSalePrice?: number;
    userId: string;
    description?: string;
}

type Response = Movement;

@Injectable()
export class CreateMovementUseCase {
    constructor(private readonly movementRepository: MovementRepository) {}

    async execute({ type, productId, quantity, unitCost, unitSalePrice, userId, description }: Request): Promise<Response> {
        if(type === MOVEMENT_TYPE.EXIT){
            const currentStock =  await this.movementRepository.getCurrentStock(productId);
            if(quantity > currentStock){
                throw new InsufficientStock();
            }
        }
        
        
        return await this.movementRepository.create({
            type,
            productId,
            quantity,
            unitCost,
            unitSalePrice,
            userId,
            description
        });
    }
}