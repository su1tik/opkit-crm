import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @MinLength(6, { message: 'Пароль должен быть не менее 6 символов' })
  @IsString()
  password: string;
}
