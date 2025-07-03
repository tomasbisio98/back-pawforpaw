import {
  Controller,
  Get,
  Put,
  Param,
  Body,
  HttpCode,
  Query,
  UseGuards,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UsersDbService } from './usersDb.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/role/decorators.role';
import { Role } from '../enum/roles.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'Get all users' })
  // @Roles(Role.Admin)
  //@UseGuards(AuthGuard, RolesGuard)
  getUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('orderBy') orderBy: 'name',
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('status') status?: 'activo' | 'inactivo',
  ) {
    const safePage = Math.max(1, page);
    const safeLimit = Math.min(Math.max(1, limit), 100);
    return this.usersService.getUsers(
      safePage,
      safeLimit,
      orderBy,
      order,
      status,
    );
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Get an user By Id' })
  @Get(':id')
  //@UseGuards(AuthGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getById(id);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'Update an User' })
  @Put(':id')
  // @UseGuards(AuthGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: UpdateUserDto,
  ) {
    console.log('📥 Body recibido:', updateUser);

    const cleanData = Object.fromEntries(
      Object.entries(updateUser).filter(([_, value]) => value !== undefined),
    );

    return this.usersService.update(id, cleanData as UpdateUserDto);
  }
}
