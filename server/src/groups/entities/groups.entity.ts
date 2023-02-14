import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Discipline } from "src/disciplines/entities/disciplines.entity";
import { UserGroups } from "src/users/entities/user-groups.entity";
import { User } from "src/users/entities/users.entity";
import { GroupDisciplines } from "./group-disciplines.entity";

interface GroupCreationAttributes {
  value: string
  description: string
}

@Table({tableName: 'groups', createdAt: false, updatedAt: false})
export class Group extends Model<Group, GroupCreationAttributes> {
  @ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  // @ApiProperty({example: 'ADMIN, description: 'Role'})
  @Column({type: DataType.STRING, unique: true, allowNull: false })
  name: string

  // @ApiProperty({example: 'ADMIN, description: 'Role'})
  @Column({type: DataType.BOOLEAN, defaultValue: false })
  isPublic: boolean

  @BelongsToMany(() => User, () => UserGroups)
  users: User[]

  @BelongsToMany(() => Discipline, () => GroupDisciplines)
  disciplines: Discipline[]
}

