import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  @Column({ default: true })
  status: boolean;

  @Column({ type: 'text' })
  description: string;

  @Column()
  imgUrl: string;
}
