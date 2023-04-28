import {
  IsString,
  Length,
  IsEmail,
  IsNotEmpty,
  Contains,
} from 'class-validator';

export class UserDto {
  @IsString()
  @Length(1, 25)
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Length(1, 25)
  lastName: string;

  @IsEmail()
  @Contains('@', { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}
