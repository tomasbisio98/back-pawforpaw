import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { UserController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersDbService} from './usersDb.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        UserService,
        UsersDbService,
        UserRepository
    ],
    controllers: [
        UserController
    ],
    exports: [
        UserRepository
    ],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
    };
};
