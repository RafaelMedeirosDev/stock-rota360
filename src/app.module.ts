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
import { LoginUseCase } from './usecases/login/LoginUseCase';
import { AuthController } from './controllers/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ProductController } from './controllers/ProductController';
import { CreateProductUseCase } from './usecases/product/CreateProductUseCase';
import { PrismaProductRepository } from './external/repositories/remote/PrismaProductRepository';
import { ProductRepository } from './domains/repositories/ProductRepository';

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
    AuthController,
    ProductController
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
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository
    },
    CreateUserUseCase,
    CreateCredentialUseCase,
    LoginUseCase,
    CreateProductUseCase
  ],
})
export class AppModule {}
