import { IsNumber, IsString, Length } from 'class-validator';

export class ValidateCommentDto {
  @IsNumber()
  public id: number;

  @IsString()
  @Length(1, 25)
  public password: string;
}
