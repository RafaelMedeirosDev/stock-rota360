import { MOVEMENT_TYPE, SupplyMovement } from "@prisma/client";

export interface CreateSupplyMovement {
    type: MOVEMENT_TYPE;
    supplyId: string;
    quantity: number;
    unitCost?: number;
    userId: string;
    description?: string;
    originMovementId?: string;
}

export interface GetCurrentStockBySupplyId {
    supplyId: string;
}

export abstract class SupplyMovementRepository {
    abstract create(data: CreateSupplyMovement): Promise<SupplyMovement>;
    abstract getCurrentStockBySupplyId(data: GetCurrentStockBySupplyId): Promise<number>;
}