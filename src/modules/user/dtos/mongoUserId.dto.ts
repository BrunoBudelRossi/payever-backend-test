import { IsString, IsNotEmpty } from 'class-validator';

export class MongoUserIdDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
