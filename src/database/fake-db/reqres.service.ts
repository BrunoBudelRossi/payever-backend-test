import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { User } from '../mongodb/interfaces/user.interface';
import { EnvsConfig } from 'src/infrastructure/config/env';

@Injectable()
export class ReqresService {
  async getUserById(userId: number): Promise<User> {
    const response = await axios.get(
      `${EnvsConfig.getFakeDbUrl()}/users/${userId}`,
    );
    return response.data.data;
  }
}
