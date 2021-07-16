import BaseEntity from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  public article: number;

  @Column({ type: 'text' })
  public content: string;

  @Column({ length: 12 })
  public username: string;

  @Column()
  public password: string;
}
