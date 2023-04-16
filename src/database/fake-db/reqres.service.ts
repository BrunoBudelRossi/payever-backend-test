import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from '../interfaces/user.interface';

@Injectable()
export class ReqresService {
  async getUserById(userId: number): Promise<User> {
    const response = await axios.get(`https://reqres.in/api/users/${userId}`);
    return response.data.data;
  }
}
