import { Donation } from 'src/donations/entities/donation.entity';
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
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751237681/hi8omp4nzacrabbwflfr.png', //Se agrega Imagen de cloudinary por defecto al perfil de usuario
  })
  profileImgUrl: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
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

  // Agrego estos dos campos para el proceso de recuperación de contraseña

  @Column({ type: 'varchar', nullable: true })
  resetPasswordToken: string | null;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires: Date | null;
}
