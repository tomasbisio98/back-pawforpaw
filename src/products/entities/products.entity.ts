import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DonationDetail } from 'src/entities/donation-detail.entity';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ length: 50 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 50 })
  imgUrl: string;

  @Column()
  status: boolean;

  @OneToMany(() => DonationDetail, (dd) => dd.product)
  donationDetails: DonationDetail[];
}
