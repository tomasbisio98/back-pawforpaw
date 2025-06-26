import {
  Controller,
  Get,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { validateUser } from '../utils/validate';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UsersDbService } from './usersDb.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/role/decorators.role';
import { Role } from '../enum/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';
import { validateUserUpdate } from 'src/utils/validateUserUpdate';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly usersDbService: UsersDbService,
  ) {}

  @HttpCode(200)
  @Get('/list')
  // @Roles(Role.Admin)
  //@UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: 'name',
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('status') status?: 'activo' | 'inactivo',
  
  ) {
    return this.usersService.getUsers(page, limit, orderBy, order, status);
  }

  @HttpCode(200)
  @Get(':id')
  //@UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getById(id);
  }

  @HttpCode(200)
  @Put(':id')
  //@UseGuards(AuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    if (validateUserUpdate(updateUser)) {
      return this.usersService.update(id, updateUser);
    }
    return 'Usuario no válido';
  }

  @HttpCode(200)
  @Delete(':id')
  // @UseGuards(AuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
