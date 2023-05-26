import { IsString, Length, IsNotEmpty, IsEmail, IsUrl } from 'class-validator';
export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Length(2, 200)
  about?: string;

  @IsUrl()
  avatar?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
