import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { promises } from "dns";
import { CreateRecipItemDTO } from "src/shared/dtos/recipItem/CreateRecipItemDTO";
import { JwtGuard } from "src/shared/guards/JwtGuard";
import { CreateRecipItemUseCase } from "src/usecases/recipItem/CreateRecipItemUseCase";

@Controller()
export class RecipItemController {
    constructor(private readonly createRecipItemUseCase: CreateRecipItemUseCase){}

    @Post('/recip-item')
    @UseGuards(JwtGuard)
    create(@Body(){productId, supplyId, quantity}: CreateRecipItemDTO){
        return this.createRecipItemUseCase.execute({
            productId,
            supplyId, 
            quantity
        })
    }
}