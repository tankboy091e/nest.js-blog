import { IsEmail, IsString } from 'class-validator';

export class ValidateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
