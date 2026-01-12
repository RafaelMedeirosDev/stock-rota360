import { CreateCredential, CredentialRepository } from "src/domains/repositories/CredentialRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaCredentialRepository implements CredentialRepository {
    constructor(private readonly repository: PrismaRemoteRepository) {}

    async create({email, passwordHash, role}: CreateCredential): Promise<any> {
        return this.repository.credential.create({
            data: {
                email,
                passwordHash,
                role
            }
        })
    }

    async findByEmail({email}: {email: string}): Promise<any | null> {
        return this.repository.credential.findUnique({
            where: {
                email
            }
        });
    }
}