import BaseEntity from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Library extends BaseEntity {
  @Column({ length: 13 })
  public isbn: string;

  @Column({ length: 64 })
  public title: string;

  @Column({ length: 64 })
  public author: string;

  @Column({ type: 'text' })
  public cover: string;

  @Column()
  public page: number;

  @Column({ length: 10 })
  public pubDate: string;

  @Column({ length: 16 })
  public publisher: string;

  @Column({ type: 'text', nullable: true })
  public link: string;
}
