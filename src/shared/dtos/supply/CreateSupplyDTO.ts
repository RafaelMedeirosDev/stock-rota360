import { UNIT_TYPE } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateSupplyDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEnum(UNIT_TYPE)
    unitType: UNIT_TYPE;

    @IsOptional()
    @IsInt()
    @Min(0)
    minStock?: number;
}