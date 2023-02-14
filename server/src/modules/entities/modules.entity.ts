import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Index, Model, Table } from "sequelize-typescript";
import { Discipline } from "src/disciplines/entities/disciplines.entity";
import { Document } from "src/documents/entities/documents.entity";

interface ModuleCreationAttributes {
  name: string
  description: string,
  disciplineId: number
}

@Table({tableName: 'modules', createdAt: false, updatedAt: false})
export class Module extends Model<Module, ModuleCreationAttributes> {
  @ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  // @ApiProperty({example: 'ADMIN, description: 'Role'})
  @Index({name: 'DisciplineIdModuleName', unique: true})
  @Column({type: DataType.STRING, allowNull: false })
  name: string

  // @ApiProperty({example: 'ADMIN, description: 'Role'})
  @Column({type: DataType.STRING, allowNull: false })
  description: string

  @ForeignKey(() => Discipline)
  @Index({name: 'DisciplineIdModuleName', unique: true})
  @Column({type: DataType.INTEGER, allowNull: false})
  disciplineId: number

  @BelongsTo(() => Discipline)
  discipline: Discipline

  @HasMany(() => Document)
  documents: Document[]
}

