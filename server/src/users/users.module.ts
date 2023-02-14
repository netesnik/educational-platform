import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/users.entity';
import { Role } from 'src/roles/entities/roles.entity';
import { UserRoles } from './entities/user-roles.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Group } from 'src/groups/entities/groups.entity';
import { UserGroups } from './entities/user-groups.entity';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Group, UserGroups]),
    RolesModule,
    forwardRef(() => AuthModule),
    GroupsModule
  ],
  exports: [
    UsersService,
  ]
})
export class UsersModule {}

