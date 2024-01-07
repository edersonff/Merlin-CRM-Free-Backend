import { IsEnum, IsString } from 'class-validator';

export class ListNewEntities {
  page: number = 1;

  @IsEnum(['99freelas'], {
    message: 'Site não encontrado',
  })
  site: '99freelas';

  @IsString()
  q?: string;
}
