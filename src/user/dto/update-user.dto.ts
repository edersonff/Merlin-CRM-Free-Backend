import { IsEmail, IsOptional, IsPhoneNumber, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @MaxLength(64, {
    message: 'O email deve ter no máximo 64 caracteres',
  })
  email: string;

  @IsOptional()
  @MaxLength(64, {
    message: 'O nome deve ter no máximo 64 caracteres',
  })
  name: string;

  @IsOptional()
  @MaxLength(40, {
    message: 'A senha deve ter no máximo 40 caracteres',
  })
  password: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone: string;
}
