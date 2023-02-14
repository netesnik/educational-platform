import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { DisciplinesService } from 'src/disciplines/disciplines.service';
import { UsersService } from 'src/users/users.service';
import { AddDisciplineDto } from './dto/add-discipline.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupInfoDto } from './dto/update-group-info.dto';
import { Group } from './entities/groups.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group) private groupRepository: typeof Group,
    private disciplinesService: DisciplinesService
  ) {}

  async getAllGroups(): Promise<Group[]> {
    const groups = await this.groupRepository.findAll({include: {all: true}})
    return groups
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.groupRepository.findByPk(id)
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.NOT_FOUND)
    }
    return group
  }

  // async getGroupByName(name: string): Promise<Group> {
  //   const group = await this.groupRepository.findOne({where: {name}})
  //   if (!group) {
  //     throw new HttpException(`Group named ${name} not found`, HttpStatus.NOT_FOUND)
  //   }
  //   return group
  // }
  
  async createGroup(dto: CreateGroupDto): Promise<Group> {
    try {
      const group = await this.groupRepository.create(dto)
      await group.$set('disciplines', []);  group.disciplines = []
      return group  
    } catch (error) {
      this.throwError(error, dto)
    }
  }

  async updateGroupInfo(id: number, dto: UpdateGroupInfoDto): Promise<Group> {
    try {
      const group = await this.getGroupById(id)
      const updatedGroup = await group.update(dto)
      return updatedGroup
    } catch (error) {
      this.throwError(error, dto as {name})
    }
  }

  async removeGroup(id: number): Promise<void> {
    const group = await this.getGroupById(id)
    await group.destroy()
  }

  async addDiscipline(dto: AddDisciplineDto): Promise<boolean> {
    const group = await this.getGroupById(dto.groupId)
    const discipline = await this.disciplinesService.getDisciplineById(dto.disciplineId)
    await group.$add('disciplines', dto.disciplineId)
    return true
  }

  private throwError(error: Error, ctx: {name: string}) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(`Group named '${ctx.name}' already exists`, HttpStatus.BAD_REQUEST)
    } else if (error instanceof HttpException) {
      throw error
    }
    throw new InternalServerErrorException()
  }
}

