import { IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @Length(1, 1000)
  public content: string;

  @IsString()
  @Length(1, 25)
  public password: string;
}
