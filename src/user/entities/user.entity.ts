import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'hp_no' })
  hpNo: string;

  @CreateDateColumn({ name: 'reg_date' })
  regDate: Date;
}
