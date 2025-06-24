import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { RecoverController } from './recover.controller';
import { RecoverService } from './recover.service';
import { RecoverMailService } from './RecoverMailService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RecoverController],
  providers: [RecoverService, RecoverMailService],
})
export class RecoverModule {}
