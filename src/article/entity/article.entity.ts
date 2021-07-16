import BaseEntity from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ArticleEntity extends BaseEntity {
  @Column({ length: 32 })
  public title: string;

  @Column({ length: 32, nullable: true })
  public subtitle: string;

  @Column({ type: 'text' })
  public content: string;

  @Column({ type: 'text', nullable: true })
  public footnote: string;
}
