import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { DonationDetail } from './donation-detail.entity';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';

@Entity()
export class DonationDetailDogs {
  @PrimaryGeneratedColumn('uuid')
  donationDetailDogsId: string;

  @ManyToOne(() => DonationDetail, (dd) => dd.dogAssignments)
  @JoinColumn({ name: 'donationDetailId' })
  donationDetail: DonationDetail;

  @Column()
  donationDetailId: string;

  @ManyToOne(() => Dog, (dog) => dog.donationDetailDogs)
  @JoinColumn({ name: 'dogId' })
  dog: Dog;

  @Column()
  dogId: string;

  @ManyToOne(() => Products, (product) => product.donationDetailsDogs)
  @JoinColumn({ name: 'productId' })
  product: Products;

  @Column()
  productId: string;
}
