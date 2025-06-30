import { User } from 'src/users/users.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const users: Partial<User>[] = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: 'Password_123',
    phone: '3001234567',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249425/User_1_qdq7gj.jpg'
  },
  {
    name: 'María Rodríguez',
    email: 'maria.rodriguez@example.com',
    password: 'Secure_Pass1',
    phone: '3002345678',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249449/User_2_eh1jyn.jpg'
  },
  {
    name: 'Carlos Gómez',
    email: 'carlos.gomez@example.com',
    password: 'StrongOne2*',
    phone: '3003456789',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249494/User_6_uzmxvo.jpg'
  },
  {
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    password: 'MyPassWord3*',
    phone: '3004567890',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249461/User_3_pr2jfe.jpg'
  },
  {
    name: 'Andrés Torres',
    email: 'andres.torres@example.com',
    password: 'SuperSafe4*',
    phone: '3005678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249505/User_7_fbdxii.jpg'
  },
  {
    name: 'Diana López',
    email: 'diana.lopez@example.com',
    password: 'AlphaBeta5*',
    phone: '3006789012',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249473/User_4_r501jr.jpg'
  },
  {
    name: 'Fernando Ruiz',
    email: 'fernando.ruiz@example.com',
    password: 'Better1234*',
    phone: '3007890123',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249517/User_8_yyawnt.jpg'
  },
  {
    name: 'Catalina Mora',
    email: 'catalina.mora@example.com',
    password: 'TrustMe6a*',
    phone: '3008901234',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249473/User_4_r501jr.jpg'
  },
  {
    name: 'Luis Méndez',
    email: 'luis.mendez@example.com',
    password: 'SafePass7*',
    phone: '3009012345',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249530/User_9_y6an6g.jpg'
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
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249541/User_10_cekimf.jpg'
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
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751250549/User_12_qykfj7.jpg'
  },
  {
    name: 'Jorge Herrera',
    email: 'jorge.herrera@example.com',
    password: 'UpDown13a*',
    phone: '3015678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751249552/User_11_ujjtqd.jpg'
  },
  {
    name: 'Wilmer Herrera',
    email: 'wilmer.herrera@example.com',
    password: 'UpDown13a*',
    phone: '3015678929',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257426/User_15_sqquom.jpg'
  },
  {
    name: 'Camila Andrea Pinzon',
    email: 'camilaPinzon@example.com',
    password: 'UpDown13a*',
    phone: '3015678161',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257412/User_14_cqxpt6.jpg'
  },
  {
    name: 'Daniela Ochoa',
    email: 'dani8@example.com',
    password: 'UpDown25a*',
    phone: '3015678641',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257453/User_17_z0gkwy.jpg'
  },
  {
    name: 'Jhon Alejandro Diaz',
    email: 'jhonadiaz@example.com',
    password: 'UpDown36a*',
    phone: '3015498901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257491/User_19_gc5ote.jpg'
  },
  {
    name: 'Pedro Manuel Reyes',
    email: 'pedromreyes@example.com',
    password: 'UpPedroa*',
    phone: '3015678261',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257518/User_21_zev9o9.jpg'
  },
  {
    name: 'Carlos Bernal',
    email: 'bernalc@example.com',
    password: 'UpDown2a*',
    phone: '3011178901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257543/User_23_wwkb5c.jpg'
  },
  {
    name: 'Oscar Adrian Alarcón',
    email: 'oalarcon@example.com',
    password: 'UpDown13oscar*',
    phone: '3064678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257556/User_24_fxf3cp.jpg'
  },
  {
    name: 'Andrés Felipe Herrera Cruz',
    email: 'andres.herrera@example.com',
    password: 'UsDown13a*',
    phone: '3015678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257568/User_25_tprefu.jpg'
  },
  {
    name: 'Caralina Perez ',
    email: 'cpereza@example.com',
    password: 'UpDown13be*',
    phone: '3001567123',
  },
  {
    name: 'Karen Cristina Zapata Monsalve',
    email: 'kzapata@example.com',
    password: 'UpDown13a25*',
    phone: '30156736901',
  },
  {
    name: 'Jorge Ivan Gomez',
    email: 'jorge.gomez@example.com',
    password: 'UpDown13a251*',
    phone: '3015678471',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257948/User_26_azn5rh.jpg'
  },
  {
    name: 'Tatiana Parra',
    email: 'tparra@example.com',
    password: 'UpDown13aparra*',
    phone: '3015616901',
  },
  {
    name: 'Bibiana Gomez',
    email: 'bgomez@example.com',
    password: 'UpDown13abibiana*',
    phone: '3019678901',
  },
  {
    name: 'Melissa Atehortua',
    email: 'matehortua@example.com',
    password: 'UpDown13amateh*',
    phone: '3015678691'
  },
  {
    name: 'Diana Patricia Velez Betancourt',
    email: 'dvelez@example.com',
    password: 'UpDown13vel*',
    phone: '3015678141'
  },
  {
    name: 'Juan Esteban Oliver Ortiz',
    email: 'olivero@example.com',
    password: 'UpDown13oliv*',
    phone: '3015668901'
  },
  {
    name: 'Eliana Cano',
    email: 'ecano@example.com',
    password: 'UpDown1cano*',
    phone: '3015678932'
  },
  {
    name: 'Catalina Santa',
    email: 'cata.santa@example.com',
    password: 'UpDown13cata*',
    phone: '3015678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257472/User_18_sijuot.jpg'
  },
  {
    name: 'Ailen Sofia Suarez',
    email: 'asuarez@example.com',
    password: 'Up13asuarez*',
    phone: '3115678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257505/User_20_ihbccf.jpg'
  },
  {
    name: 'Jacqueline Garcia Silva',
    email: 'jgarcia@example.com',
    password: 'Upgarcia13a*',
    phone: '3015678901',
    profileImgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751257530/User_22_uaonl1.jpg'
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
