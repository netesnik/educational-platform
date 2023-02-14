import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineInfoDto } from './dto/update-discipline-info.dto';
import { Discipline } from './entities/disciplines.entity';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectModel(Discipline) private disciplineRepository: typeof Discipline,
  ) {}

  async getAllDisciplines(): Promise<Discipline[]> {
    const disciplines = await this.disciplineRepository.findAll({include: {all: true}})
    return disciplines
  }

  async getDisciplineById(id: number): Promise<Discipline> {
    const discipline = await this.disciplineRepository.findByPk(id)
    if (!discipline) {
      throw new HttpException(`Discipline not found`, HttpStatus.NOT_FOUND)
    }
    return discipline
  }
  
  // async getDisciplineByName(name: string): Promise<Discipline> {
  //   const discipline = await this.disciplineRepository.findOne({where: {name}})
  //   if (!discipline) {
  //     throw new HttpException(`Discipline named ${name} not found`, HttpStatus.NOT_FOUND)
  //   }
  //   return discipline
  // }
  
  async createDiscipline(dto: CreateDisciplineDto): Promise<Discipline> {
    try {
      const discipline = await this.disciplineRepository.create(dto)
      return discipline  
    } catch (error) {
      this.throwError(error, dto)
    }
  }

  async updateDisciplineInfo(id: number, dto: UpdateDisciplineInfoDto): Promise<Discipline> {
    try {
      const discipline = await this.getDisciplineById(id)
      const updatedDiscipline = await discipline.update(dto)
      return updatedDiscipline
    } catch (error) {
      this.throwError(error, dto as {name})
    }
  }

  async removeDiscipline(id: number): Promise<boolean> {
    const count = await this.disciplineRepository.destroy({where: {id}})
    if (count === 0) {
      throw new HttpException('Discipline not found', HttpStatus.NOT_FOUND)
    }
    return true
  }

  private throwError(error: Error, ctx: {name: string}) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(
        `Discipline named '${ctx.name}' already exists`,
        HttpStatus.BAD_REQUEST
      )
    } else if (error instanceof HttpException) {
      throw error
    }
    throw new InternalServerErrorException()
  }
}
