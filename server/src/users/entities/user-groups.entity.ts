import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/entities/groups.entity";
import { User } from "./users.entity";

@Table({tableName: 'user_groups', createdAt: false, updatedAt: false})
export class UserGroups extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: string

  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER})
  groupId: string
}

