import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Products' })
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ default: true })
  status: boolean;
}
