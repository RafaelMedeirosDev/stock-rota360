import { Injectable } from "@nestjs/common";
import { ROLE, User } from "@prisma/client";
import { UserRepository } from "src/domains/repositories/UserRepository";
import { UserAlreadyExists } from "src/shared/errors/cases/UserAlreadyExists";
import { CreateCredentialUseCase } from "../credential/CreateCredentialUseCase";

interface Request {
    name: string;
    email: string;
    cpf: string;
    passwordHash: string;
    role: string;
}

type Response = User;

@Injectable()
export class CreateUserUseCase{
    constructor(
        private readonly userRepository: UserRepository,
        private readonly createCredentialUseCase: CreateCredentialUseCase
    ) {}

    async execute({name, email, cpf, passwordHash, role}: Request) {
        const userByCpf =  await this.userRepository.findByCpf({cpf});
        if(userByCpf !== null) {
            throw new UserAlreadyExists();
        }

        const credential = await this.createCredentialUseCase.execute({
            email, 
            passwordHash, 
            role: role as ROLE
        });

        return await this.userRepository.create({
            name, 
            cpf, 
            credentialId: credential.id});
    }
}