import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { DonationDetail } from './donation-detail.entity';
import { User } from 'src/users/users.entity';

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
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELED'],
    default: 'PENDING',
  })
  status: string;

  @OneToMany(() => DonationDetail, (detail) => detail.donation)
  donationDetails: DonationDetail[];

  //(una donación tiene un usuario)
  @ManyToOne(() => User, (user: User) => user.donations)
  @JoinColumn({ name: 'userId' })
  user: User;
}
