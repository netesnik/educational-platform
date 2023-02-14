import { IsNumber, IsString } from "class-validator"

export class CreateModuleDto {
  @IsString({message: 'Must be a string'})
  readonly name: string

  @IsString({message: 'Must be a string'})
  readonly description: string

  @IsNumber({}, {message: 'Must be a number'})
  readonly disciplineId: number
}
