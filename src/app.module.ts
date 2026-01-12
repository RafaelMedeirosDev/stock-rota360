import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/UserController';
import { ConfigModule } from '@nestjs/config';
import { PrismaRemoteRepository } from './external/repositories/remote/PrismaRemoteRepository';
import { UserRepository } from './domains/repositories/UserRepository';
import { CredentialRepository } from './domains/repositories/CredentialRepository';
import { CreateUserUseCase } from './usecases/user/CreateUserUseCase';
import { CreateCredentialUseCase } from './usecases/credential/CreateCredentialUseCase';
import { PrismaUserRepository } from './external/repositories/remote/PrismaUserRepository';
import { PrismaCredentialRepository } from './external/repositories/remote/PrismaCredentialRepository';
import { LoginUseCase } from './usecases/LoginUseCase.ts/LoginUseCase';
import { AuthController } from './controllers/AuthController';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController
  ],
  providers: [
    AppService,
    PrismaRemoteRepository,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository
    },
    {
      provide: CredentialRepository,
      useClass: PrismaCredentialRepository
    },
    CreateUserUseCase,
    CreateCredentialUseCase,
    LoginUseCase
  ],
})
export class AppModule {}
