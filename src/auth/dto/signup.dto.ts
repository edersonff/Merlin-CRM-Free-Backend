import { IsEmail, IsEnum, IsNotEmpty, MaxLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class SignupUserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'O email é obrigatório',
  })
  @MaxLength(64, {
    message: 'O email deve ter no máximo 64 caracteres',
  })
  email: string;

  @IsNotEmpty({
    message: 'O nome é obrigatório',
  })
  @MaxLength(64, {
    message: 'O nome deve ter no máximo 64 caracteres',
  })
  name: string;

  @IsNotEmpty({
    message: 'A senha é obrigatória',
  })
  @MaxLength(40, {
    message: 'A senha deve ter no máximo 40 caracteres',
  })
  password: string;

  @IsNotEmpty({
    message: 'A regra é obrigatório',
  })
  @IsEnum(['developer', 'manager', 'proposal', 'closed', 'admin'], {
    message:
      'A regra deve ser um dos seguintes: Desenvolvedor, Gerente, Proposta, Fechador ou Administrador',
  })
  role: User['role'];

  @IsNotEmpty({
    message: 'O status é obrigatório',
  })
  @IsEnum(['active', 'inactive'], {
    message: 'O status deve ser um dos seguintes: Ativo ou Inativo',
  })
  status: User['status'] = 'active';
}
