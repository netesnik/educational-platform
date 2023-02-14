import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/entities/groups.entity";
import { Role } from "src/roles/entities/roles.entity";
import { UserGroups } from "./user-groups.entity";
import { UserRoles } from "./user-roles.entity";

interface UserCreationAttributes {
  email: string
  password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({example: 'example@mail.com', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: false })
  email: string

  @ApiProperty({example: 'Alex', description: 'Name'})
  @Column({type: DataType.STRING})
  name: string

  @ApiProperty({example: '12345678', description: 'Password'})
  @Column({type: DataType.STRING, allowNull: false })
  password: string

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[]

  @BelongsToMany(() => Group, () => UserGroups)
  groups: Group[]
}

