import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { Wish } from './entities/wish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService, JwtStrategy],
  exports: [Wish, WishesService],
})
export class WishesModule {}
