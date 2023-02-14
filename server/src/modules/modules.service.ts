import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DisciplinesService } from 'src/disciplines/disciplines.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { Module } from './entities/modules.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectModel(Module) private moduleRepository: typeof Module,
    private disciplinesService: DisciplinesService
  ) {}

  async getModuleById(id: number): Promise<Module> {
    const module = await this.moduleRepository.findByPk(id)
    if (!module) {
      throw new HttpException('Module not found', HttpStatus.NOT_FOUND)
    }
    return module
  }

  async getAllModulesByDisciplineId(disciplineId: number): Promise<Module[]> {
    const modules = await this.moduleRepository.findAll({where: {disciplineId}})
    return modules
  }

  async createModule(dto: CreateModuleDto): Promise<Module> {
    try {
      const module = await this.moduleRepository.create(dto)
      return module
    } catch (error) {
      this.throwError(error, dto)
    }
  }

  async updateModule(id: number, dto: UpdateModuleDto): Promise<Module> {
    try {
      const module = await this.getModuleById(id)
      const updatedModule = await module.update(dto)
      return updatedModule
    } catch (error) {
      this.throwError(error, dto as {name, disciplineId})
    }
  }

  async removeModule(id: number): Promise<void> {
    const module = await this.getModuleById(id)
    await module.destroy()
  }

  private throwError(error: Error, ctx: {disciplineId: number, name: string}) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      throw new HttpException(
        `Discipline with id ${ctx.disciplineId} already has a module named '${ctx.name}'`,
        HttpStatus.BAD_REQUEST
      )
    } else if (error instanceof HttpException) {
      throw error
    }
    throw new InternalServerErrorException()
  }
}

