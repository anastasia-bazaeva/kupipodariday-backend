import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WishesService],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService, User],
})
export class UsersModule {}
