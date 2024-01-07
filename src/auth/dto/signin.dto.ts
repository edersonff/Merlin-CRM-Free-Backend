import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class SigninUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'O email é obrigatório',
  })
  @MaxLength(64, {
    message: 'O email deve ter no máximo 64 caracteres',
  })
  email: string;

  @IsNotEmpty({
    message: 'A senha é obrigatória',
  })
  @MaxLength(40, {
    message: 'A senha deve ter no máximo 40 caracteres',
  })
  password: string;
}
