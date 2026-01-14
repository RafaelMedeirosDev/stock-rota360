import { Injectable } from "@nestjs/common";
import { CredentialRepository } from "src/domains/repositories/CredentialRepository";
import { TokenDTO } from "src/shared/dtos/auth/TokenDTO";
import * as bcrypt from 'bcrypt';
import { UserNotFound } from "src/shared/errors/cases/UserNotFound";
import { WrongPasswordOrEmail } from "src/shared/errors/cases/WrongPasswprdOrEmail";
import { JwtService } from "@nestjs/jwt";

interface Request {
  email: string;
  passwordHash: string;
}

type Response = TokenDTO;

@Injectable()
export class LoginUseCase {
  constructor (
      private readonly credentialRepository: CredentialRepository,
      private jwtService: JwtService
  ){}

  async execute({email, passwordHash}: Request): Promise<Response> {
    const user = await this.credentialRepository.findByEmail({email});

    if(!user) {
        throw new UserNotFound();
    }

    const isMatch = await bcrypt.compare(passwordHash, user.passwordHash);

    if(!isMatch) {
      throw new WrongPasswordOrEmail();
    }

    return {
      accessToken: await this.jwtService.signAsync({
          userId: user.id,
          name: user.email,
           role: user.role
      })
      }
    }
}