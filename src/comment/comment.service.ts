import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidateCommentDto } from './dto/validate-comment.dto ';
import { Comment } from './entity/comment.entity';
import * as bcrypt from 'bcrypt';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  public async findAllByArticleId(id: number) {
    const result = await this.repository.find({
      where: { article: id },
      order: { created_at: 'ASC' },
    });
    return result.map(({ password, ...other }) => ({
      ...other,
    }));
  }

  public findOne(id: number) {
    return this.repository.findOne(id);
  }

  public create({ password, ...other }: CreateCommentDto) {
    const comment = this.repository.create({
      password: bcrypt.hashSync(password, 10),
      ...other,
    });
    return this.repository.save(comment);
  }

  public async update(id: number, { password, content }: UpdateCommentDto) {
    const comment = await this.repository.findOne(id);

    if (!(await bcrypt.compare(password, comment.password))) {
      throw new UnauthorizedException();
    }

    return this.repository.save({
      ...comment,
      content,
    });
  }

  public async validate({ id, password }: ValidateCommentDto) {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(password, comment.password))) {
      throw new UnauthorizedException();
    }

    return null;
  }

  public delete(id: number) {
    return this.repository.delete(id);
  }
}
