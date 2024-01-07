import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateFilterTypeDto {
  @IsNotEmpty({
    message: 'O nome é obrigatório',
  })
  @MaxLength(64, {
    message: 'O nome deve ter no máximo 64 caracteres',
  })
  name: string;
}
