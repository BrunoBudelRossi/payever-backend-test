import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ReqresService } from 'src/database/fake-db/reqres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/database/interfaces/user.schema';
import { RabbitMQModule } from '../rabbitmq/rabbitmq.module';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/users'),
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    RabbitMQModule,
  ],
  controllers: [UserController],
  providers: [UserService, ReqresService, RabbitMQService],
})
export class UserModule {}
