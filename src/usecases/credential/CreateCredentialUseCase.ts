import { ROLE } from "@prisma/client";
import { CredentialRepository } from "src/domains/repositories/CredentialRepository";
import { UserAlreadyExists } from "src/shared/errors/cases/UserAlreadyExists";
import * as bcrypt from 'bcrypt';
import { Injectable } from "@nestjs/common";

interface Request {
    email: string;
    passwordHash: string;
    role: string;
}

@Injectable()
export class CreateCredentialUseCase{
    constructor(private readonly credentialRepository: CredentialRepository){}

    async execute({email, passwordHash, role}: Request) {
        const credentialByEmail = await this.credentialRepository.findByEmail({email});
        if(credentialByEmail !== null) {
            throw new UserAlreadyExists();
        }

        const password = await bcrypt.hash(passwordHash, 10);

        return await this.credentialRepository.create({
            email, 
            passwordHash: password, 
            role: role as ROLE
        });
    }
}