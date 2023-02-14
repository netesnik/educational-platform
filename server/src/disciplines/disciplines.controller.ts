import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineInfoDto } from './dto/update-discipline-info.dto';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Get()
  getAll() {
    return this.disciplinesService.getAllDisciplines()
  }

  @Post()
  create(@Body() dto: CreateDisciplineDto) {
    return this.disciplinesService.createDiscipline(dto)
  }

  @Put(':id')
  updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDisciplineInfoDto
  ) {
    return this.disciplinesService.updateDisciplineInfo(id, dto)
  }
  
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.disciplinesService.removeDiscipline(id)
  }
}
