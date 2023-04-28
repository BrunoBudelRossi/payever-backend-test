import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../database/mongodb/interfaces/user.interface';
import { writeFileSync, unlinkSync } from 'fs';
import axios from 'axios';
import { join } from 'path';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(user: UserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getAllUsers(): Promise<any> {
    const users = await this.userModel.find().exec();
    return users;
  }

  private async getUserAvatarUrl(userId: string): Promise<string> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException(
        `User with id ${userId} not found`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return user.avatar;
  }

  private async fetchUserAvatarImage(avatarUrl: string): Promise<Buffer> {
    const response = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });
    return response.data;
  }

  private async convertImageToBase64(image: Buffer): Promise<string> {
    return image.toString('base64');
  }

  private async saveBase64ImageToFile(
    base64Image: string,
    userId: string,
  ): Promise<void> {
    const filePath = join(__dirname, `../../../images/${userId}.jpg`);
    writeFileSync(filePath, base64Image);
  }

  async getBase64UserAvatar(userId: string): Promise<string> {
    const avatarUrl = await this.getUserAvatarUrl(userId);
    const avatarImage = await this.fetchUserAvatarImage(avatarUrl);
    const base64Image = await this.convertImageToBase64(avatarImage);
    await this.saveBase64ImageToFile(base64Image, userId);
    return base64Image;
  }

  async deleteUser(userId: string) {
    try {
      const res = await this.userModel.deleteOne({ _id: userId }).exec();

      unlinkSync(join(__dirname, `../../../images/${userId}.jpg`));

      return res;
    } catch (error) {
      throw new HttpException(
        `Failed to delete user: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
