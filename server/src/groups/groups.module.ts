import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.entity';
import { UserGroups } from 'src/users/entities/user-groups.entity';
import { Discipline } from 'src/disciplines/entities/disciplines.entity';
import { GroupDisciplines } from './entities/group-disciplines.entity';
import { Group } from './entities/groups.entity'
import { UsersService } from 'src/users/users.service';
import { DisciplinesModule } from 'src/disciplines/disciplines.module';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService],
  imports: [
    SequelizeModule.forFeature([Group, User, UserGroups, Discipline, GroupDisciplines]),
    DisciplinesModule
  ],
  exports: [GroupsService]
})
export class GroupsModule {}
