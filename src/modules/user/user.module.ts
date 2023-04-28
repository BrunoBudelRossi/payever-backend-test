import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReqresService } from 'src/database/fake-db/reqres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/database/mongodb/user.schema';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { EmailModule } from '../email/email.module';
import { MongoModule } from 'src/database/mongodb/mongo.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    RabbitMQModule,
    EmailModule,
    MongoModule,
  ],
  controllers: [UserController],
  providers: [UserService, ReqresService, RabbitMQService],
})
export class UserModule {}
