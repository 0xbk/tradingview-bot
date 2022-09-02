import { Injectable } from '@nestjs/common';
import { LinearClient } from 'bybit-api';
import { Config } from './config.service';

@Injectable()
export class Bybit extends LinearClient {
  constructor(private readonly config: Config) {
    super(config.getApiKey(), config.getApiSecret());
  }
}
