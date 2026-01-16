import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { Movement } from "@prisma/client";
import { CurrentUser } from "src/shared/decorators/CurrentUserDecorator";
import { CurrentUserDTO } from "src/shared/dtos/CurrentUserDTO";
import { CreateMovementDTO } from "src/shared/dtos/movement/CreateMovementDTO";
import { JwtGuard } from "src/shared/guards/JwtGuard";
import { CreateMovementUseCase } from "src/usecases/movement/CreateMovementUseCase";

@Controller()
export class MovementController {
    constructor(private readonly createMovementUseCase: CreateMovementUseCase){}

    @Post('/movement')
    @UseGuards(JwtGuard)
    create(
        @CurrentUser(){userId}: CurrentUserDTO,
        @Body() { type, productId, quantity, unitCost, unitSalePrice, description }: CreateMovementDTO
    ): Promise<Movement> {
        return this.createMovementUseCase.execute({
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