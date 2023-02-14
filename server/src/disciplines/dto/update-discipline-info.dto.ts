// import { ApiProperty } from "@nestjs/swagger"
// import { IsEmail, IsString, Length } from "class-validator"

export class UpdateDisciplineInfoDto {
  // @ApiProperty({example: 'example@mail.com', description: 'Email'})
  // @IsEmail({}, {message: 'Invalid email'})
  readonly name?: string
  
  readonly description?: string
}

