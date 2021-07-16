import BaseEntity from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  public email: string;

  @Column({ select: false })
  public password: string;

  @Column()
  public username: string;

  @Column({ nullable: true, select: false })
  public refreshToken: string;
}
