import { MOVEMENT_TYPE } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from "class-validator";

export class CreateMovementDTO {
    @IsNotEmpty()
    @IsEnum(MOVEMENT_TYPE)
    type!: MOVEMENT_TYPE;

    @IsNotEmpty()
    @IsUUID()
    productId!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    quantity!: number;

    @IsOptional()
    unitCost?: number;

    @IsOptional()
    unitSalePrice?: number;

    @IsOptional()
    @IsString()
    description?: string;
}