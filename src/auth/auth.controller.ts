import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { SigninUserDto } from 'src/users/dto/signin-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  @Post('signup')
  create(@Body() createUserDto: CreateUserDto) {
    return 'Create';
  }

  @Post('signin')
  signin(@Body() signinUserDto: SigninUserDto) {
    return 'signin';
  }
}
