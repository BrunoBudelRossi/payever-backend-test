import { Test, TestingModule } from '@nestjs/testing';
import { ReqresService } from 'src/database/fake-db/reqres.service';
import { RabbitMQService } from 'src/modules/rabbitmq/rabbitmq.service';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, ReqresService, RabbitMQService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('getUserAvatar', () => {
    it('should return a user avatar by ID', async () => {
      const user = {
        id: 7,
        email: 'michael.lawson@reqres.in',
        first_name: 'Michael',
        last_name: 'Lawson',
        avatar: 'https://reqres.in/img/faces/7-image.jpg',
      };
      const avatarBase64 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABlBMVEX///8AAABVwtN+AAAApUlEQVR42mP8z8AARIwE1wFOwKTpA8GhiIJYAhAV2QjCBdDkXQAAAABJRU5ErkJggg==';
      jest
        .spyOn(userService, 'getBase64UserAvatar')
        .mockImplementation(async () => avatarBase64);

      const result = await controller.getUser(7);

      expect(result).toEqual({
        ...user,
        avatar: avatarBase64,
      });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData: any = {
        email: 'john.doe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        avatar: 'https://example.com/avatar.png',
        _id: '1',
      };
      const createdUser = {
        ...userData,
      };
      jest
        .spyOn(userService, 'createUser')
        .mockImplementation(async () => createdUser);

      expect(await controller.createUser(userData)).toBe(createdUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = '1';
      jest
        .spyOn(userService, 'deleteUser')
        .mockImplementation(async () => undefined);

      expect(await controller.deleteUser(userId)).toBeUndefined();
    });
  });
});
