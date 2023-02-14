import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Module } from "src/modules/entities/modules.entity";

interface DocumentCreationAttributes {
  name: string
  folder: string
  description: string
  moduleId: number
}

@Table({tableName: 'documents', createdAt: false, updatedAt: false})
export class Document extends Model<Document, DocumentCreationAttributes> {
  @ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({example: 'Some_file.txt', description: 'File name'})
  @Column({type: DataType.STRING, allowNull: false })
  name: string

  @ApiProperty({example: 'Some_folder', description: 'File storage folder'})
  @Column({type: DataType.STRING})
  folder: string

  @ApiProperty({
    example: 'folder or folder/subfolder1/subfolder2/... (empty to save to root folder)',
    description: 'Directory for storing files (static folder in server)'
  })
  @Column({type: DataType.STRING, allowNull: false })
  description: string

  @ForeignKey(() => Module)
  @Column({type: DataType.INTEGER, allowNull: false})
  moduleId: number

  @BelongsTo(() => Module)
  module: Module[]
}

