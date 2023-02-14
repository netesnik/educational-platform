import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  createModule(@Body() dto: CreateModuleDto) {
    return this.modulesService.createModule(dto)
  }

  @Put(':id')
  updateModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateModuleDto
  ) {
    return this.modulesService.updateModule(id, dto)
  }

  @Delete(':id')
  removeModule(@Param('id', ParseIntPipe) id: number) {
    return this.modulesService.removeModule(id)
  }
}
