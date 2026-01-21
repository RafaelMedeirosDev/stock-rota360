import { MOVEMENT_TYPE } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateSupplyMovementDTO {
    @IsNotEmpty()
    @IsEnum(MOVEMENT_TYPE)
    type!: MOVEMENT_TYPE;

    @IsNotEmpty()
    @IsUUID()
    supplyId!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number;

    @IsOptional()
    @IsNumber()
    unitCost: number;

    @IsOptional()
    @IsString()
    description?: string;

    originMovementId: string;
}