import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Products } from 'src/products/entities/products.entity';
import { DonationDetailDogs } from './donation-detail-dog.entity';
import { Donation } from './donation.entity';

@Entity()
export class DonationDetail {
  @PrimaryGeneratedColumn('uuid')
  donationDetailId: string;

  @ManyToOne(() => Donation, (donation) => donation.donationDetails)
  @JoinColumn({ name: 'donationId' })
  donation: Donation;

  @Column()
  donationId: string;

  @ManyToOne(() => Products, (product) => product.donationDetails)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column()
  product_id: string;

  @Column('decimal')
  price_unit: number;

  @OneToMany(() => DonationDetailDogs, (ddd) => ddd.donationDetail)
  dogAssignments: DonationDetailDogs[];
}
