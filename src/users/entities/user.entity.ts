import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @Column({
    default: 'Пока ничего не рассказал о себе',
  })
  @Length(2, 200)
  about: string;

  @Column({
    default: 'https://i.pravatar.cc/300',
  })
  avatar: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  //дописать связи после того, как добавлю желания, предложения и вишлисты
}
