import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DonationDetailDogs } from 'src/donations/entities/donation-detail-dog.entity';

@Entity('dogs')
export class Dog {
  @PrimaryGeneratedColumn('uuid')
  dogId: string;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'enum', enum: ['M', 'H'] })
  sex: 'M' | 'H';

  @Column({ length: 250 })
  imgUrl: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 50 })
  city: string;

  @Column()
  status: boolean;

  @OneToMany(() => DonationDetailDogs, (dd) => dd.dog)
  donationDetailDogs: DonationDetailDogs[];
}
