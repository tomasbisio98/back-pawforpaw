import { Donation } from 'src/entities/donation.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  dni: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @Column({
    type: 'text',
    default:
      'https://drive.google.com/file/d/1cgd_yxHskzKR7u9bIOhpfYbX6BTGtt6l/view?usp=drive_link',
  })
  profileImgUrl: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  phone: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @Column({
    type: 'enum',
    enum: ['google', 'local'],
    default: 'local',
  })
  authProvider: 'google' | 'local';

  @CreateDateColumn({
    type: 'date',
  })
  createdAt: Date;

  @OneToMany(() => Donation, (donation) => donation.user)
  donations: Donation[];
}
