import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discipline } from './entities/disciplines.entity';
import { Group } from 'src/groups/entities/groups.entity';
import { GroupDisciplines } from 'src/groups/entities/group-disciplines.entity';
import { Module as ModuleEntity } from '../modules/entities/modules.entity'

@Module({
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
  imports: [
    SequelizeModule.forFeature([Discipline, Group, GroupDisciplines, ModuleEntity])
  ],
  exports: [DisciplinesService]
})
export class DisciplinesModule {}
