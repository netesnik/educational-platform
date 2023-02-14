import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { GroupDisciplines } from "src/groups/entities/group-disciplines.entity";
import { Group } from "src/groups/entities/groups.entity";
import { Module } from "src/modules/entities/modules.entity";

interface DisciplineCreationAttributes {
  value: string
  description: string
}

@Table({tableName: 'disciplines', createdAt: false, updatedAt: false})
export class Discipline extends Model<Discipline, DisciplineCreationAttributes> {
  @ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({example: 'Math', description: 'Discipline name'})
  @Column({type: DataType.STRING, unique: true, allowNull: false })
  name: string

  @ApiProperty({example: 'Math is the science ...', description: 'Discipline description'})
  @Column({type: DataType.STRING, allowNull: false })
  description: string

  @BelongsToMany(() => Group, () => GroupDisciplines)
  groups: Group[]

  @HasMany(() => Module)
  modules: Module[]
}

