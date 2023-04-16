import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReqresService } from 'src/database/fake-db/reqres.service';
import { UserService } from './user.service';
import { User } from 'src/database/interfaces/user.interface';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private reqresService: ReqresService,
    private readonly rabbitMQService: RabbitMQService,
  ) {}

  @Get('/:userId/avatar')
  async getBase64UserAvatar(@Param('userId') userId: string) {
    return this.userService.getBase64UserAvatar(userId);
  }

  @Delete('/:userId/avatar')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: number) {
    return this.reqresService.getUserById(userId);
  }

  @Get()
  async getAllUser() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(@Body() user: User) {
    const createdUser = await this.userService.createUser(user);
    this.rabbitMQService.sendEvent(
      'test',
      '123',
      `message sent from user ${createdUser.id}`,
    );
    await this.userService.sendEmail(createdUser);
    return createdUser;
  }
}
