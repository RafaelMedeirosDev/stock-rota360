import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './controllers/UserController';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { MovementController } from './controllers/MovementController';
import { MovementRepository } from './domains/repositories/MovementRepository';
import { PrismaMovementRepository } from './external/repositories/remote/PrismaMovementRepository';
import { CreateMovementUseCase } from './usecases/movement/CreateMovementUseCase';
import { JwtStrategy } from './shared/strategies/JwtStrategyUseCase';
import { SupplyMovementController } from './controllers/SupplyMovementController';
import { PrismaSupplyMovementRepository } from './external/repositories/remote/PrismaSupplyMovementRepository';
import { SupplyMovementRepository } from './domains/repositories/SupplyMovementRepository';
import { CreateSupplyMovementUseCase } from './usecases/supplyMovement/CreateSupplyMovementUseCase';
import { SupplyController } from './controllers/SupplyController';
import { SupplyRepository } from './domains/repositories/SupplyRepository';
import { PrismaSupplyRepository } from './external/repositories/remote/PrismaSupplyRepository';
import { CreateSupplyUseCase } from './usecases/supply/CreateSupplyUseCase';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      
    }),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ProductController,
    MovementController,
    SupplyController,
    SupplyMovementController
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
    {
      provide: MovementRepository,
      useClass: PrismaMovementRepository
    },
    {
      provide: SupplyRepository,
      useClass: PrismaSupplyRepository
    },
    {
      provide: SupplyMovementRepository,
      useClass: PrismaSupplyMovementRepository
    },
    CreateUserUseCase,
    CreateCredentialUseCase,
    LoginUseCase,
    CreateProductUseCase,
    CreateMovementUseCase,
    JwtStrategy,
    CreateSupplyUseCase,
    CreateSupplyMovementUseCase
  ],
})
export class AppModule {}
