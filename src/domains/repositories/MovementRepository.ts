import { Movement, MOVEMENT_TYPE } from "@prisma/client";

export interface CreateMovement {
    type: MOVEMENT_TYPE;
    productId: string;
    quantity: number;
    unitCost?: number;
    unitSalePrice?: number;
    userId: string;
    description?: string;
}

export abstract class MovementRepository {
    abstract create(movement: CreateMovement): Promise<Movement>;
    abstract getCurrentStock(productId: string): Promise<number>;
}