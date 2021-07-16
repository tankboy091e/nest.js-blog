import { IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly subtitle?: string;

  @IsString()
  readonly content: string;

  @IsString()
  @IsOptional()
  readonly footnote?: string;
}
