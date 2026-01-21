import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateSupplyDTO } from "src/shared/dtos/supply/CreateSupplyDTO";
import { JwtGuard } from "src/shared/guards/JwtGuard";
import { CreateSupplyUseCase } from "src/usecases/supply/CreateSupplyUseCase";

@Controller()
@UsePipes(new ValidationPipe({whitelist: true}))
export class SupplyController {
    constructor(private readonly createSuppluUseCase: CreateSupplyUseCase){}

    @Post('/supply')
    @UseGuards(JwtGuard)
    create(@Body(){name, unitType, minStock}: CreateSupplyDTO){
        return this.createSuppluUseCase.execute({
            name,
            unitType,
            minStock
        })
    }
}