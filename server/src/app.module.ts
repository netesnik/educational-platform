import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/users.entity';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './users/entities/user-roles.entity';
import { Role } from './roles/entities/roles.entity';
import { AuthModule } from './auth/auth.module';
import { DocumentsModule } from './documents/documents.module';
import { GroupsModule } from './groups/groups.module';
import { ModulesModule } from './modules/modules.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Module as ModuleEntity } from './modules/entities/modules.entity'
import { Group } from './groups/entities/groups.entity';
import { UserGroups } from './users/entities/user-groups.entity';
import { Discipline } from './disciplines/entities/disciplines.entity';
import { GroupDisciplines } from './groups/entities/group-disciplines.entity';
import { Document } from './documents/entities/documents.entity';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env-${process.env.NODE_ENV}`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRoles,
        Group,
        UserGroups,
        Discipline,
        GroupDisciplines,
        ModuleEntity,
        Document
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    DocumentsModule,
    GroupsModule,
    ModulesModule,
    DisciplinesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

