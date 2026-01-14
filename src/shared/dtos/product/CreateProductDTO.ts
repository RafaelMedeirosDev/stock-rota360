import { PRODUCT_CATEGORY, PRODUCT_TYPE, UNIT_TYPE } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    variant?: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    measurementValue: number;

    @IsNotEmpty()
    @IsEnum(UNIT_TYPE)
    measurementUnit: UNIT_TYPE;

    @IsNotEmpty()
    @IsEnum(PRODUCT_TYPE)
    type: PRODUCT_TYPE;

    @IsNotEmpty()
    @IsEnum(PRODUCT_CATEGORY)
    category: PRODUCT_CATEGORY;


    @IsOptional()
    @IsInt()
    @Min(0)
    minStock?: number;
}