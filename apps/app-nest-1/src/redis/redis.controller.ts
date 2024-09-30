import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  key = 'myKey';

  constructor(private readonly redisService: RedisService) {}

  @Get()
  async getData() {
    const value = await this.redisService.redis.get(this.key);

    return { [this.key]: value };
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async setData(@Body('newValue') value: string) {
    await this.redisService.redis.set(this.key, value);
  }
}
