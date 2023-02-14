import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/roles.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/entities/users.entity';
import { UserRoles } from 'src/users/entities/user-roles.entity';

@Module({
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
