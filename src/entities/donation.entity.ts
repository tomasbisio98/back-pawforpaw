import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DonationDetail } from './donation-detail.entity';

@Entity('donations')
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  donationId: string;

  @Column('uuid')
  userId: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'decimal' })
  totalValue: number;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
  })
  status: string;

  @OneToMany(() => DonationDetail, (dd) => dd.donation)
  donationDetails: DonationDetail[];
}
