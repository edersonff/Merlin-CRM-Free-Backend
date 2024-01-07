import { IsUrl, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class UpdateFilterDto {
  @IsUrl()
  @IsOptional()
  url: string;

  @IsBoolean()
  @IsOptional()
  is_valid: boolean;

  @IsArray()
  @IsOptional()
  filter_type: number[];
}
