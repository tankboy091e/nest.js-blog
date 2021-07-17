import { IsOptional, IsString, Length } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  @Length(1, 13)
  public readonly isbn: string;

  @IsString()
  public readonly page: string;

  @IsString()
  public readonly paragraph: string;

  @IsString()
  @IsOptional()
  public readonly annotation?: string;
}
