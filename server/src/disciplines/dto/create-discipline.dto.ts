// import { ApiProperty } from "@nestjs/swagger"
// import { IsEmail, IsString, Length } from "class-validator"

export class CreateDisciplineDto {
  // @ApiProperty({example: 'example@mail.com', description: 'Email'})
  // @IsEmail({}, {message: 'Invalid email'})
  readonly name: string

  // @ApiProperty({example: 'example@mail.com', description: 'Email'})
  // @IsEmail({}, {message: 'Invalid email'})
  readonly description: string
}

