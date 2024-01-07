import { IsUrl, IsBoolean, IsArray } from 'class-validator';

export class CreateFilterDto {
  @IsUrl()
  url: string;

  @IsBoolean()
  is_valid: boolean;

  @IsArray()
  filter_type: number[];
}
