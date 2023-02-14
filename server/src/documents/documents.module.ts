import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Document } from './entities/documents.entity';
import { Module as ModuleEntity } from '../modules/entities/modules.entity'
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService],
  imports: [
    SequelizeModule.forFeature([Document, ModuleEntity]),
    FilesModule,
  ],
  exports: []
})
export class DocumentsModule {}
