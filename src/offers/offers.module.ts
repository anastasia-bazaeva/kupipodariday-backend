import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Offer } from './entities/offer.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, Wish])],
  controllers: [OffersController],
  providers: [OffersService, JwtStrategy],
  exports: [OffersService, Offer],
})
export class OffersModule {}
