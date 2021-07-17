import BaseEntity from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Quote extends BaseEntity {
  @Column()
  public library: number;

  @Column({ type: 'text', nullable: true })
  public annotation: string;

  @Column()
  public page: string;

  @Column({ type: 'text' })
  public paragraph: string;
}
