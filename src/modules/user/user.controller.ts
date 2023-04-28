import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReqresService } from 'src/database/fake-db/reqres.service';
import { UserService } from './user.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { HttpResponse } from 'src/infrastructure/http/response';
import { MongoUserIdDto } from './dtos/mongoUserId.dto';
import { UserDto } from './dtos/user.dto';
import { FakeDbUserIdDto } from './dtos/fakeDbUserId.dto';
import { EmailService } from '../email/email.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly reqresService: ReqresService,
    private readonly rabbitMQService: RabbitMQService,
    private readonly emailService: EmailService,
  ) {}

  @Get('/:userId/avatar')
  async getBase64UserAvatar(@Param() params: MongoUserIdDto) {
    const user = await this.userService.getBase64UserAvatar(params.userId);
    return HttpResponse.success(
      'Base64 avatar of the user returned successfully',
      user,
    );
  }

  @Delete('/:userId/avatar')
  async deleteUser(@Param() params: MongoUserIdDto) {
    await this.userService.deleteUser(params.userId);
    return HttpResponse.success('User has been deleted');
  }

  @Get('/:userId')
  async getUser(@Param() params: FakeDbUserIdDto) {
    const user = await this.reqresService.getUserById(params.userId);
    return HttpResponse.success('User returned successfully', user);
  }

  @Get()
  async getAllUser() {
    const users = await this.userService.getAllUsers();
    return HttpResponse.success('Users returned successfully', users);
  }

  @Post()
  async createUser(@Body() user: UserDto) {
    const createdUser = await this.userService.createUser(user);
    this.rabbitMQService.sendEvent(
      'test',
      '123',
      `message sent from user ${createdUser.id}`,
    );
    await this.emailService.sendEmail('test subject', 'test text');
    return HttpResponse.success('user created successfully', createdUser);
  }
}
