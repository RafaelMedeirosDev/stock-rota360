import { Body, Controller, Post } from "@nestjs/common";
import { CreateCredentialDTO } from "src/shared/dtos/credential/CreateCredentialDTO";
import { CreateUserDTO } from "src/shared/dtos/user/CreateUserDTO";
import { User } from "@prisma/client";
import { CreateUserUseCase } from "src/usecases/user/CreateUserUseCase";

@Controller()
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post('/user')
    userCreate(
        @Body() {name, email, cpf, passwordHash, role}:  CreateCredentialDTO & CreateUserDTO
    ): Promise<User> {
        return this.createUserUseCase.execute({
            name, 
            email, 
            cpf, 
            passwordHash, 
            role
        });
    }
}