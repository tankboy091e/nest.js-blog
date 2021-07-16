import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLibraryDto {
  @IsString()
  public readonly isbn: string;

  @IsString()
  public readonly title: string;

  @IsString()
  public readonly author: string;

  @IsString()
  public readonly cover: string;

  @IsNumber()
  public readonly page: number;

  @IsString()
  public readonly pubDate: string;

  @IsString()
  public readonly publisher: string;

  @IsString()
  @IsOptional()
  public readonly link: string;
}
