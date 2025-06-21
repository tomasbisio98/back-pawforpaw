import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { DonationDetail } from 'src/donations/entities/donation-detail.entity';
import { DonationDetailDogs } from 'src/donations/entities/donation-detail-dog.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ length: 50 })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 250 })
  imgUrl: string;

  @Column()
  status: boolean;

  @OneToMany(() => DonationDetail, (dd) => dd.product)
  donationDetails: DonationDetail[];

  @OneToMany(() => DonationDetailDogs, (ddd) => ddd.product)
  donationDetailsDogs: DonationDetailDogs[];

  @ManyToMany(() => Dog, (dogs) => dogs.products)
  dogs: Dog[];
}
