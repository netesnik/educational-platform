import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module as ModuleEntity } from '../modules/entities/modules.entity'
import { DisciplinesModule } from 'src/disciplines/disciplines.module';

@Module({
  controllers: [ModulesController],
  providers: [ModulesService],
  imports: [
    SequelizeModule.forFeature([ModuleEntity]),
    DisciplinesModule
  ],
})
export class ModulesModule {}
