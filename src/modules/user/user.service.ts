import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as nodemailer from 'nodemailer';
import { Model } from 'mongoose';
import { User } from '../../database/interfaces/user.interface';
import { writeFile, unlinkSync } from 'fs';
import axios from 'axios';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getAllUsers(): Promise<any> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async sendEmail(user: User) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'auth@gmail.com',
        pass: '12345678',
      },
    });

    const mailOptions = {
      from: 'auth@gmail.com',
      to: 'brunobudelrossi3745@outlook.com',
      subject: 'test',
      text: 'test',
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(`Erro ao enviar e-mail`);
      console.log(error);
    }
  }

  async getBase64UserAvatar(userId: string) {
    try {
      const { avatar } = await this.userModel.findById(userId).exec();

      const res = await axios.get(avatar, { responseType: 'arraybuffer' });
      const base64Image = Buffer.from(res.data, 'binary').toString('base64');

      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');

      const buffer = Buffer.from(base64Data, 'base64');

      writeFile(
        join(__dirname, `../../../images/${userId}.jpg`),
        buffer,
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        },
      );

      return base64Image;
    } catch (error) {
      console.log(`Erro ao recuperar usuário por ID ${userId}: ${error}`);
      throw error;
    }
  }
  async deleteUser(userId: string) {
    try {
      const res = await this.userModel.deleteOne({ _id: userId }).exec();

      unlinkSync(join(__dirname, `../../../images/${userId}.jpg`));

      return res;
    } catch (error) {
      console.log(`Erro ao recuperar usuário por ID ${userId}: ${error}`);
      throw error;
    }
  }
}
