import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.dev.env',
    }),
    UserModule,
    WhiskyModule,
    DistilleryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
