// import { ApiProperty } from "@nestjs/swagger"
// import { IsEmail, IsString, Length } from "class-validator"

export class UpdateUserInfoDto {
  // @ApiProperty({example: 'example@mail.com', description: 'Email'})
  // @IsEmail({}, {message: 'Invalid email'})
  readonly id: number

  readonly email: string

  readonly name: string

  readonly password: string
}

