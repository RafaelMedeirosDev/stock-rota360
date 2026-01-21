import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SupplyMovement } from "@prisma/client";
import { CurrentUser } from "src/shared/decorators/CurrentUserDecorator";
import { CurrentUserDTO } from "src/shared/dtos/CurrentUserDTO";
import { CreateSupplyMovementDTO } from "src/shared/dtos/supplyMovement/CreateSupplyMovementDTO";
import { JwtGuard } from "src/shared/guards/JwtGuard";
import { CreateSupplyMovementUseCase } from "src/usecases/supplyMovement/CreateSupplyMovementUseCase";

@Controller()
@UseGuards(JwtGuard)
export class SupplyMovementController {
    constructor(private readonly createSupplyMovementUseCase: CreateSupplyMovementUseCase) {}

    @Post('/supply-movement')
    createSupplyMovement(
        @CurrentUser() {userId}: CurrentUserDTO,
        @Body() { type, supplyId, quantity, unitCost, description, originMovementId }: CreateSupplyMovementDTO

    ): Promise<SupplyMovement> {
        return this.createSupplyMovementUseCase.execute({
            userId,
            type,
            supplyId,
            quantity,
            unitCost,
            description,
            originMovementId
        });
    }
}