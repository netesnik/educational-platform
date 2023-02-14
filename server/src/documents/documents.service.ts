import { Injectable, StreamableFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Response } from 'express';
import { FilesService } from 'src/files/files.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './entities/documents.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document) private documentRepository: typeof Document,
    private filesService: FilesService
  ) {}

  async createDocument(
    dto: CreateDocumentDto,
    file: Express.Multer.File
  ): Promise<Document> {
    const name = dto.name || file.originalname
    const folder = 'documents/' + (dto.folder || '') // documents/discipline/module/<custom>/
    await this.filesService.saveFile(file.buffer, name, folder)
    const document = await this.documentRepository.create({...dto, name, folder})
    return document
  }

  getFile(filePath: string, res: Response): StreamableFile {
    const fileName = filePath.split('/').at(-1)
    res.set({'Content-Disposition': `attachment; filename=${fileName}`})
    return this.filesService.getFile(filePath)
  }
}
