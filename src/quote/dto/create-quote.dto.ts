import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateQuoteDto {
  @IsNumber()
  public readonly library: number;

  @IsString()
  public readonly page: string;

  @IsString()
  public readonly paragraph: string;

  @IsString()
  @IsOptional()
  public readonly annotation?: string;
}
