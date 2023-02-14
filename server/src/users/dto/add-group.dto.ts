// import { ApiProperty } from "@nestjs/swagger"
// import { IsEmail, IsString, Length } from "class-validator"

export class AddGroupDto {
  // @ApiProperty({example: 'example@mail.com', description: 'Email'})
  // @IsEmail({}, {message: 'Invalid email'})
  readonly userId: number

  readonly groupId: number
}

