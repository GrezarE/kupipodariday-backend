import { Max, IsDate, IsUrl, IsInt, Min } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Wish } from 'src/wishes/entities/wishes.entities';
import { User } from 'src/users/entities/user.entities';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Min(1)
  @Max(250)
  name: string;

  @Column()
  @IsUrl()
  image: string;

  // @OneToMany(() => Wish, (wish) => wish.id)
  // // @JoinColumn()
  // items: Wish[];

  // @Column('int', { array: true })
  // items: number[];

  @ManyToMany(() => Wish, (wish) => wish.id, {cascade: true})
  @JoinTable()
  items: any[];

  @ManyToOne(() => User)
  @JoinColumn()
  owner: User;
}
