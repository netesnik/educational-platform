import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroupsService } from 'src/groups/groups.service';
import { RolesService } from 'src/roles/roles.service';
import { AddGroupDto } from './dto/add-group.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
    private groupsService: GroupsService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(dto)
    const role = await this.rolesService.getRoleByValue('USER')
    await user.$set('roles', [role.id]);  user.roles = [role]
    await user.$set('groups', []);        user.groups = []
    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.findAll({ include: {all: true} })
    return users
  }

  // async updateUserInfo(dto: UpdateUserInfoDto): Promise<boolean> {
  //   // Pipe to remove extra fields
  //   // Update token after change password
  //   const {id, password, ...updateInfo} = dto
  //   const passwordHash = 
  //   const [affectedCount] = await this.userModel.update(
  //     {password: passwordHash, ...updateInfo}
  //     {where: {id}}
  //   )
  //   return affectedCount > 0
  // }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findByPk(id, {include: {all: true}})
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    return user
  }
  
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {email},
      include: {all: true}
    })
    if (!user) {
      throw new HttpException(`User not found`, HttpStatus.NOT_FOUND)
    }
    return user
  }

  async addRole(dto: AddRoleDto): Promise<boolean> {
    const user = await this.getUserById(dto.userId)
    const role = await this.rolesService.getRoleByValue(dto.role)
    await user.$add('roles', role.id)
    return true
  }

  // async removeRole()

  async addGroup(dto: AddGroupDto): Promise<boolean> {
    const user = await this.getUserById(dto.userId)
    const group = await this.groupsService.getGroupById(dto.groupId)
    await user.$add('groups', group.id)
    return true
  }

  // async removeGroup()
}
