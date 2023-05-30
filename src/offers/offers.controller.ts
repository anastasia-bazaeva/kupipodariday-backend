import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user, createOfferDto);
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(id);
  }
  // в ТЗ нет этих роутов и методов, наверное можно удалить?
  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateOfferDto: UpdateOfferDto) {
  //   return this.offersService.update(id, updateOfferDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: number) {
  //   return this.offersService.remove(id);
  // }
}
