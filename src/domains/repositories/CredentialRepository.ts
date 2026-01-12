import { ROLE,Credential } from '@prisma/client';

export interface CreateCredential {
    email: string;
    passwordHash: string;
    role: ROLE;
}

export interface FindByEmail {
    email: string;
}

export abstract class CredentialRepository {
    abstract create(credential: CreateCredential): Promise<Credential>;
    abstract findByEmail(email: FindByEmail): Promise<Credential | null>;
}