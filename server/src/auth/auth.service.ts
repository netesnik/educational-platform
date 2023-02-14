import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email)
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST)
    }

    const hashPassword = await bcrypt.hash(dto.password, 5)
    const user = await this.usersService.createUser({...dto, password: hashPassword})
    return this.generateToken(user)
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto)
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles}
    return {
      token: this.jwtService.sign(payload),
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(dto.email)
    if (user) {
      const validPassword = await bcrypt.compare(dto.password, user.password)
      if (validPassword) return user
    }
    throw new UnauthorizedException({message: 'Invalid email or password'})
  }

  // async logout(?) {
  //
  // }
}
