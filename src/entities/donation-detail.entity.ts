import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Products } from 'src/products/entities/products.entity';
import { DonationDetailDog } from './donation-detail-dog.entity';
import { Donation } from './donation.entity';

@Entity('donationDetail')
export class DonationDetail {
  @PrimaryGeneratedColumn('uuid')
  donationDetailId: string;

  @ManyToOne(() => Donation, (d) => d.donationDetails)
  donation: Donation;

  @ManyToOne(() => Products, (p) => p.donationDetails)
  product: Products;

  @Column({ type: 'decimal' })
  price_unit: number;

  @OneToMany(() => DonationDetailDog, (dd) => dd.donationDetail)
  donationDetailDogs: DonationDetailDog[];
}
