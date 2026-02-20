import { IsInt, IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class CreateRecipItemDTO {
    @IsUUID()
    @IsNotEmpty()
    productId: string;
    
    @IsUUID()
    @IsNotEmpty()
    supplyId: string;

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    quantity: number;
}