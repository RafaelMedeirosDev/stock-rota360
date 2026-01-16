import { User } from "@prisma/client";

export interface CreateUser {
    name: string;
    cpf: string;
    credentialId: string
}

export interface FindByCpf {
    cpf: string;
}

export interface FindByCredentialId {
    credentialId: string;
}

export abstract class UserRepository {
    abstract create(user: CreateUser): Promise<User>;
    abstract findByCpf(cpf: FindByCpf): Promise<User | null>;
    abstract findByCredentialId(credentialId: FindByCredentialId): Promise<User | null>;
}