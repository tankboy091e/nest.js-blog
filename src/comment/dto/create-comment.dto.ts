import { IsNumber, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  public article: number;

  @IsString()
  @Length(1, 1000)
  public content: string;

  @IsString()
  @Length(1, 12)
  public username: string;

  @IsString()
  @Length(1, 25)
  public password: string;
}
