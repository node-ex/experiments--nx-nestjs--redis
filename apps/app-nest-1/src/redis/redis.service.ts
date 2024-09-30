import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  public redis: Redis;

  constructor() {
    const mandatoryCredentials = [
      process.env['REDIS_HOST'],
      process.env['REDIS_PORT'],
    ];

    if (mandatoryCredentials.some((cred) => !cred)) {
      throw new Error('Missing mandatory Redis credentials');
    }

    const [host, port] = mandatoryCredentials as [string, string];
    const password = process.env['REDIS_PASSWORD'];
    this.redis = new Redis({
      host,
      port: parseInt(port),
      ...(password ? { password } : {}),
    });
  }
}
