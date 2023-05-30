import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
//import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { NotFoundEception } from 'src/utils/not-found';
import { Wish } from 'src/wishes/entities/wish.entity';
import { BadRequestException } from 'src/utils/bad-request';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepo: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepo: Repository<Wish>,
  ) {}

  async create(user, createOfferDto: CreateOfferDto) {
    const wish = await this.wishRepo.findOne({
      where: { id: createOfferDto.itemId },
      relations: {
        offers: true,
        owner: true,
      },
    });

    const updatedRaised = wish.offers
      .map((offer) => offer.amount)
      .reduce((acc, value) => acc + value, 0);
    wish.raised = updatedRaised;

    if (!wish) throw new NotFoundEception();
    if (wish.owner.id === user.id) throw new BadRequestException();
    if (wish.raised > wish.price) throw new BadRequestException();
    return this.offersRepo.save({
      ...createOfferDto,
      user: user,
      item: wish,
    });
  }

  findAll() {
    return this.offersRepo.find({
      relations: {
        item: { offers: true, owner: true },
        user: {
          offers: { item: true },
          wishes: { offers: true, owner: true },
          wishlist: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const offer = await this.offersRepo.find({
      where: [{ id: id }],
      relations: {
        item: { offers: true, owner: true },
        user: {
          offers: { item: true },
          wishes: { offers: true, owner: true },
          wishlist: true,
        },
      },
    });
    if (!offer) throw new NotFoundEception();
    return offer;
  }
  // в ТЗ нет этих роутов и методов
  // update(id: number, updateOfferDto: UpdateOfferDto) {
  //   return `This action updates a #${id} offer`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} offer`;
  // }
}
