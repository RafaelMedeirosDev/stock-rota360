import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginDTO } from "src/shared/dtos/auth/LoginDTO";
import { TokenDTO } from "src/shared/dtos/auth/TokenDTO";
import { LoginUseCase } from "src/usecases/login/LoginUseCase";

@Controller()
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
    constructor(private readonly loginUseCase: LoginUseCase) {}

    @Post('/auth/login')
    login(@Body(){email, passwordHash}: LoginDTO): Promise<TokenDTO> {
        return this.loginUseCase.execute({
            email, 
            passwordHash
        });
    }
}