import { User } from 'src/users/users.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const users: Partial<User>[] = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: 'Password_123',
    phone: '3001234567',
  },
  {
    name: 'María Rodríguez',
    email: 'maria.rodriguez@example.com',
    password: 'Secure_Pass1',
    phone: '3002345678',
  },
  {
    name: 'Carlos Gómez',
    email: 'carlos.gomez@example.com',
    password: 'StrongOne2*',
    phone: '3003456789',
  },
  {
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    password: 'MyPassWord3*',
    phone: '3004567890',
  },
  {
    name: 'Andrés Torres',
    email: 'andres.torres@example.com',
    password: 'SuperSafe4*',
    phone: '3005678901',
  },
  {
    name: 'Diana López',
    email: 'diana.lopez@example.com',
    password: 'AlphaBeta5*',
    phone: '3006789012',
  },
  {
    name: 'Fernando Ruiz',
    email: 'fernando.ruiz@example.com',
    password: 'Better1234*',
    phone: '3007890123',
  },
  {
    name: 'Catalina Mora',
    email: 'catalina.mora@example.com',
    password: 'TrustMe6a*',
    phone: '3008901234',
  },
  {
    name: 'Luis Méndez',
    email: 'luis.mendez@example.com',
    password: 'SafePass7*',
    phone: '3009012345',
  },
  {
    name: 'Paula Castillo',
    email: 'paula.castillo@example.com',
    password: 'Powerful8a*',
    phone: '3010123456',
  },
  {
    name: 'Esteban Jiménez',
    email: 'esteban.jimenez@example.com',
    password: 'MySecret9*',
    phone: '3011234567',
  },
  {
    name: 'Lucía Vargas',
    email: 'lucia.vargas@example.com',
    password: 'CoolKey10a*',
    phone: '3012345678',
  },
  {
    name: 'Diego Castaño',
    email: 'diego.castano@example.com',
    password: 'Password11A*',
    phone: '3013456789',
  },
  {
    name: 'Sara Martínez',
    email: 'sara.martinez@example.com',
    password: 'SecureMe12*',
    phone: '3014567890',
  },
  {
    name: 'Jorge Herrera',
    email: 'jorge.herrera@example.com',
    password: 'UpDown13a*',
    phone: '3015678901',
  },
];

export async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);
  const count = await repo.count();

  if (count === 0) {
    const usersHashed = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password ?? '', 10),
      })),
    );

    await repo.save(usersHashed);
    console.log('👤 Seed: usuarios insertados con contraseña hasheada');
  }
}
