import { CreateCredential, CredentialRepository, FindByEmail } from "src/domains/repositories/CredentialRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Injectable } from "@nestjs/common";
import { Credential } from "@prisma/client";

@Injectable()
export class PrismaCredentialRepository implements CredentialRepository {
    constructor(private readonly repository: PrismaRemoteRepository) {}

    async create({email, passwordHash, role}: CreateCredential): Promise<Credential> {
        return this.repository.credential.create({
            data: {
                email,
                passwordHash,
                role
            }
        })
    }

    async findByEmail({email}: FindByEmail): Promise<Credential | null> {
        return this.repository.credential.findUnique({
            where: {
                email
            }
        });
    }
    
}