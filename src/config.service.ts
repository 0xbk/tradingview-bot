import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Config {
  constructor(private readonly config: ConfigService) {}

  getApiKey() {
    return this.config.get<string>('API_KEY');
  }

  getApiSecret() {
    return this.config.get<string>('API_SECRET');
  }
}
