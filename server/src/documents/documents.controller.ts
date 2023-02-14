import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createDocument(
    @Body() dto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.documentsService.createDocument(dto, file)
  }

  // Access Guard
  @Get('/*')
  getFile(@Param('0') path: string, @Res({passthrough: true}) res: Response) {
    return this.documentsService.getFile(path, res)
  }
}
