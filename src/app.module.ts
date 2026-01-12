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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    })
  ],
  controllers: [
    AppController,
    UserController
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
    CreateCredentialUseCase
  ],
})
export class AppModule {}
