import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddGroupDto } from './dto/add-group.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
// @Roles('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  // @ApiOperation({summary: 'User creation'})
  // @ApiResponse({status: 200, type: User})
  // @Post()
  // create(@Body() dto: CreateUserDto) {
  //   return this.usersService.createUser(dto)
  // }

  @ApiOperation({summary: 'Getting all users'})
  @ApiResponse({status: 200, type: [User]})
  // @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Give a role'})
  @ApiResponse({status: 200})
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary: 'Add user to group'})
  @ApiResponse({status: 200})
  @Roles('TEACHER', 'ADMIN', 'CHIEF_ADMIN')
  @UseGuards(RolesGuard)
  @Post('group')
  addGroup(@Body() dto: AddGroupDto) {
    return this.usersService.addGroup(dto)
  }
}

