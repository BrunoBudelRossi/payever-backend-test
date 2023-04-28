import { IsNumber, IsNotEmpty } from 'class-validator';

export class FakeDbUserIdDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
