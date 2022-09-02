import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { Bybit } from './bybit.service';
import { Config } from './config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [Bybit, Config],
})
export class AppModule {}
