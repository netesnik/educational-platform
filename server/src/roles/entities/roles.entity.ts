import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRoles } from "src/users/entities/user-roles.entity";
import { User } from "src/users/entities/users.entity";

interface RoleCreationAttributes {
  value: string
  description: string
}

@Table({tableName: 'roles', createdAt: false, updatedAt: false})
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({example: '1', description: 'Unique ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number

  @ApiProperty({example: 'ADMIN', description: 'Role'})
  @Column({type: DataType.STRING, unique: true, allowNull: false })
  value: string

  @ApiProperty({example: 'Administrator', description: 'Description'})
  @Column({type: DataType.STRING, allowNull: false })
  description: string

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}

