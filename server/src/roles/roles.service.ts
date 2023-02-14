import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  // async createRole(dto: CreateRoleDto): Promise<Role> {
  //   const role = await this.roleRepository.create(dto)
  //   return role
  // }
  
  async getRoleByValue(value: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: {value} })
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND)
    }
    return role
  }
}
