// database.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvsConfig } from 'src/infrastructure/config/env';

@Module({
  imports: [MongooseModule.forRoot(EnvsConfig.getMongoDbUrl())],
})
export class MongoModule {}
