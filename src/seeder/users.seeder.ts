import { User } from 'src/users/users.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

export const users: Partial<User>[] = [
  {
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    password: '1Password_123',
    phone: '3001234567',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318451/User_1_H_k0pg9b.jpg',
  },
  {
    name: 'María Rodríguez',
    email: 'maria.rodriguez@example.com',
    password: '1Secure_Pass1',
    phone: '3002345678',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318439/User_1_M_iairko.jpg',
  },
  {
    name: 'Carlos Gómez',
    email: 'carlos.gomez@example.com',
    password: '2StrongOne2*',
    phone: '3003456789',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318453/User_2_H_wpdsoi.jpg',
  },
  {
    name: 'Laura Sánchez',
    email: 'laura.sanchez@example.com',
    password: '2MyPassWord3*',
    phone: '3004567890',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318439/User_2_M_zuyor2.jpg',
  },
  {
    name: 'Andrés Torres',
    email: 'andres.torres@example.com',
    password: '3SuperSafe4*',
    phone: '3005678901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318450/User_3_H_ril91r.jpg',
  },
  {
    name: 'Diana López',
    email: 'diana.lopez@example.com',
    password: '3AlphaBeta5*',
    phone: '3006789012',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318439/User_3_M_wgqdfq.jpg',
  },
  {
    name: 'Fernando Ruiz',
    email: 'fernando.ruiz@example.com',
    password: '4Better1234*',
    phone: '3007890123',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318450/User_4_H_zfvf5c.jpg',
  },
  {
    name: 'Catalina Mora',
    email: 'catalina.mora@example.com',
    password: '4TrustMe6a*',
    phone: '3008901234',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318434/User_4_M_dm7wrt.jpg',
  },
  {
    name: 'Luis Méndez',
    email: 'luis.mendez@example.com',
    password: '5SafePass7*',
    phone: '3009012345',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318450/User_5_H_jndpmv.jpg',
  },
  {
    name: 'Paula Castillo',
    email: 'paula.castillo@example.com',
    password: '5Powerful8a*',
    phone: '3010123456',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318434/User_5_M_kqh7wr.jpg',
  },
  {
    name: 'Esteban Jiménez',
    email: 'esteban.jimenez@example.com',
    password: '6MySecret9*',
    phone: '3011234567',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318450/User_6_H_grsyul.jpg',
  },
  {
    name: 'Lucía Vargas',
    email: 'lucia.vargas@example.com',
    password: '6CoolKey10a*',
    phone: '3012345678',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318434/User_6_M_mbdool.jpg',
  },
  {
    name: 'Diego Castaño',
    email: 'diego.castano@example.com',
    password: '7Password11A*',
    phone: '3013456789',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318446/User_7_H_itsezg.jpg',
  },
  {
    name: 'Sara Martínez',
    email: 'sara.martinez@example.com',
    password: '7SecureMe12*',
    phone: '3014567890',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318434/User_7_M_bbdgvu.jpg',
  },
  {
    name: 'Jorge Herrera',
    email: 'jorge.herrera@example.com',
    password: '8UpDown13a*',
    phone: '3015678901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318449/User_8_H_ps0xdi.jpg',
  },
  {
    name: 'Wilmer Herrera',
    email: 'wilmer.herrera@example.com',
    password: '9UpDown13a*',
    phone: '3015678929',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318445/User_9_H_qe7yml.jpg',
  },
  {
    name: 'Camila Andrea Pinzon',
    email: 'camilaPinzon@example.com',
    password: '8UpDown13a*',
    phone: '3015678161',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318434/User_8_M_cp9rx6.jpg',
  },
  {
    name: 'Daniela Ochoa',
    email: 'dani8@example.com',
    password: '9UpDown25a*',
    phone: '3015678641',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_9_M_myhrtp.jpg',
  },
  {
    name: 'Jhon Alejandro Diaz',
    email: 'jhonadiaz@example.com',
    password: '10UpDown36a*',
    phone: '3015498901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318445/User_10_H_dtmbqy.jpg',
  },
  {
    name: 'Pedro Manuel Reyes',
    email: 'pedromreyes@example.com',
    password: '11UpPedroa*',
    phone: '3015678261',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318445/User_10_H_dtmbqy.jpg',
  },
  {
    name: 'Carlos Bernal',
    email: 'bernalc@example.com',
    password: '12UpDown2a*',
    phone: '3011178901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318445/User_12_H_gwkae0.jpg',
  },
  {
    name: 'Oscar Adrian Alarcón',
    email: 'oalarcon@example.com',
    password: '13UpDown13oscar*',
    phone: '3064678901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318440/User_13_H_ago8c4.jpg',
  },
  {
    name: 'Andrés Felipe Herrera Cruz',
    email: 'andres.herrera@example.com',
    password: '14UsDown13a*',
    phone: '3015678901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318440/User_14_H_kcpd5p.jpg',
  },
  {
    name: 'Caralina Perez ',
    email: 'cpereza@example.com',
    password: '10UpDown13be*',
    phone: '3001567123',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_10_M_r14s04.jpg',
  },
  {
    name: 'Karen Cristina Zapata Monsalve',
    email: 'kzapata@example.com',
    password: '11UpDown13a25*',
    phone: '30156736901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_11_M_sg2fdm.jpg',
  },
  {
    name: 'Jorge Ivan Gomez',
    email: 'jorge.gomez@example.com',
    password: '15UpDown13a251*',
    phone: '3015678471',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318439/User_15_H_y3gqoy.jpg',
  },
  {
    name: 'Tatiana Parra',
    email: 'tparra@example.com',
    password: '12UpDown13aparra*',
    phone: '3015616901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_12_M_tagjhc.jpg',
  },
  {
    name: 'Bibiana Gomez',
    email: 'bgomez@example.com',
    password: '13UpDown13abi*',
    phone: '3019678901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_13_M_sjl1sn.jpg',
  },
  {
    name: 'Melissa Atehortua',
    email: 'matehortua@example.com',
    password: '14UpDown13*',
    phone: '3015678691',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_14_M_py41pl.jpg',
  },
  {
    name: 'Diana Patricia Velez Betancourt',
    email: 'dvelez@example.com',
    password: '15UpDown13vel*',
    phone: '3015678141',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318432/User_15_M_jc83vt.jpg',
  },
  {
    name: 'Juan Esteban Oliver Ortiz',
    email: 'olivero@example.com',
    password: '16UpDown13oliv*',
    phone: '3015668901',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318445/User_16_H_viwnh8.jpg',
  },
  {
    name: 'Eliana Cano',
    email: 'ecano@example.com',
    password: '16UpDown1cano*',
    phone: '3015678932',
    profileImgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751318433/User_16_M_h9hcga.jpg',
  },
  {
    name: 'Catalina Santa',
    email: 'cata.santa@example.com',
    password: 'UpDown13cata*',
    phone: '3015678901',
  },
  {
    name: 'Ailen Sofia Suarez',
    email: 'asuarez@example.com',
    password: 'Up13asuarez*',
    phone: '3115678901',
  },
  {
    name: 'Jacqueline Garcia Silva',
    email: 'jgarcia@example.com',
    password: 'Upgarcia13a*',
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
