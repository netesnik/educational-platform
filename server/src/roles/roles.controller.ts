import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';
import { RolesService } from './roles.service';

// USER, TEACHER, ADMIN, (PRIMARY_ADMIN only 1, default)
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @ApiOperation({summary: 'Role creation'})
  // @ApiResponse({status: 200, type: Role})
  // @Post()
  // create(@Body() dto: CreateRoleDto) {
  //   return this.rolesService.createRole(dto)
  // }
  
  @ApiOperation({summary: 'Get role by value'})
  @ApiResponse({status: 200, type: Role})
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value)
  }
}
