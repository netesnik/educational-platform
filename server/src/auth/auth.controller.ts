import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @ApiOperation({summary: 'Login'})
  // @ApiResponse({status: 200, type: User})
  // @UseGuard()
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto)
  }

  @ApiOperation({summary: 'Registration'})
  // @ApiResponse({status: 200, type: User})
  // Default username (Middleware?)
  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto)
  }

  // @Post('/logout')
  // login(@Body() dto: CreateUserDto) {
  //   return this.authService.login(dto)
  // }
}
