import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Discipline } from "src/disciplines/entities/disciplines.entity";
import { Group } from "src/groups/entities/groups.entity";

@Table({tableName: 'group_disciplines', createdAt: false, updatedAt: false})
export class GroupDisciplines extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER})
  groupId: string

  @ForeignKey(() => Discipline)
  @Column({type: DataType.INTEGER})
  disciplineId: string
}

