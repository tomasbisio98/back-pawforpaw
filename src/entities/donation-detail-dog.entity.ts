import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { DonationDetail } from './donation-detail.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Entity('donationDetailDogs')
export class DonationDetailDog {
  @PrimaryGeneratedColumn('uuid')
  donationDetailDogsId: string;

  @ManyToOne(() => DonationDetail, (dd) => dd.donationDetailDogs)
  donationDetail: DonationDetail;

  @ManyToOne(() => Dog, (d) => d.donationDetailDogs)
  dog: Dog;
}
