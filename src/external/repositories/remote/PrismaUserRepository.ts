import { CreateUser, FindByCpf, UserRepository } from "src/domains/repositories/UserRepository";
import { PrismaRemoteRepository } from "./PrismaRemoteRepository";
import { User } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly repository: PrismaRemoteRepository) {}


    async create({name, cpf, credentialId}: CreateUser): Promise<User> {
        return this.repository.user.create({
            data: {
                name,
                cpf,
                credentialId
            }
        });
    }

    async findByCpf({cpf}: FindByCpf): Promise<User | null> {
        return this.repository.user.findUnique({
            where: {
                cpf
            }
        });
    }
}