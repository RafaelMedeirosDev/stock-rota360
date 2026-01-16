import { Injectable } from "@nestjs/common";
import { CredentialRepository } from "src/domains/repositories/CredentialRepository";
import { TokenDTO } from "src/shared/dtos/auth/TokenDTO";
import * as bcrypt from 'bcrypt';
import { UserNotFound } from "src/shared/errors/cases/UserNotFound";
import { WrongPasswordOrEmail } from "src/shared/errors/cases/WrongPasswprdOrEmail";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { UserRepository } from "src/domains/repositories/UserRepository";

interface Request {
  email: string;
  passwordHash: string;
}

type Response = TokenDTO;

@Injectable()
export class LoginUseCase {
  constructor (
      private readonly credentialRepository: CredentialRepository,
      private readonly userRepository: UserRepository,
      private jwtService: JwtService
  ){}

  async execute({email, passwordHash}: Request): Promise<Response> {
    const credential = await this.credentialRepository.findByEmail({email});

    if(!credential) {
        throw new UserNotFound();
    }

    const isMatch = await bcrypt.compare(passwordHash, credential.passwordHash);

    if(!isMatch) {
      throw new WrongPasswordOrEmail();
    }

    const user = await this.userRepository.findByCredentialId({
      credentialId: credential.id
    });
    if(!user) {
      throw new UserNotFound();
    }

    return {
      accessToken: await this.jwtService.signAsync({
          userId: user.id,
          name: credential.email,
           role: credential.role
      })
      }
    }
}