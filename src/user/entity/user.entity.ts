import { Exclude } from 'class-transformer';
import BaseEntity from 'src/common/entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @Column()
  public username: string;

  @Column({ nullable: true })
  @Exclude()
  public refreshToken: string;
}
