import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { DonationDetailDogs } from 'src/donations/entities/donation-detail-dog.entity';
import { Products } from 'src/products/entities/products.entity';

@Entity('dogs')
export class Dog {
  @PrimaryGeneratedColumn('uuid')
  dogId: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'enum', enum: ['M', 'H'] })
  sex: 'M' | 'H';

  @Column({ length: 250, nullable: true })
  imgUrl: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 50 })
  city: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DonationDetailDogs, (dd) => dd.dog)
  donationDetailDogs: DonationDetailDogs[];

  @ManyToMany(() => Products, (product) => product.dogs, {
    cascade: true,
  })
  @JoinTable()
  products: Products[];
}
