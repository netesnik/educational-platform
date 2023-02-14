import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
  @ApiProperty({example: 'example@mail.com', description: 'Email'})
  @IsEmail({}, {message: 'Invalid email'})
  readonly email: string

  @ApiProperty({example: 'Alex', description: 'Name'})
  @IsString({message: 'Must be a string'})
  readonly name?: string

  @ApiProperty({example: '12345678', description: 'Password'})
  @IsString({message: 'Must be a string'})
  @Length(4, 16, {message: 'Password length must be between 4 and 16 characters'})
  readonly password: string
}

