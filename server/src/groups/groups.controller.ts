import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AddDisciplineDto } from './dto/add-discipline.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupInfoDto } from './dto/update-group-info.dto';
import { GroupsService } from './groups.service';

// work (no validation)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  getAll() {
    return this.groupsService.getAllGroups()
  }

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.groupsService.createGroup(dto)
  }

  @Put(':id')
  updateInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateGroupInfoDto
  ) {
    return this.groupsService.updateGroupInfo(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.groupsService.removeGroup(id)
  }

  @Post('discipline')
  addDiscipline(@Body() dto: AddDisciplineDto) {
    return this.groupsService.addDiscipline(dto)
  }
}
