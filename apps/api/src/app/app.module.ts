import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { WhiskyModule } from './whisky/whisky.module';
import { DistilleryModule } from './distillery/distillery.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? './apps/api/.env'
          : './apps/api/.dev.env'
    }),
    LoggerModule.forRoot({}),
    UserModule,
    WhiskyModule,
    DistilleryModule
  ]
})
export class AppModule {}
