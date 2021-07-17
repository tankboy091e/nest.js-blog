import { IsOptional, IsString } from 'class-validator';

export class UpdateQuoteDto {
  @IsString()
  @IsOptional()
  public readonly page?: string;

  @IsString()
  @IsOptional()
  public readonly paragraph?: string;

  @IsString()
  @IsOptional()
  public readonly annotation?: string;
}
