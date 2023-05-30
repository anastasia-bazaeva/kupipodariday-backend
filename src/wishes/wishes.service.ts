import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { NotFoundEception } from 'src/utils/not-found';
import { Unauthorized } from 'src/utils/unauthorized';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepo: Repository<Wish>,
  ) {}
  create(user: User, createWishDto: CreateWishDto) {
    const wish = this.wishRepo.save({
      ...createWishDto,
      owner: user,
    });
    return wish;
  }

  findAll() {
    return this.wishRepo.find();
  }

  findOne(id: number) {
    return this.wishRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async update(id: number, user: number, updateWishDto: UpdateWishDto) {
    const existanceCheck = await this.findOne(id);
    if (!existanceCheck) {
      throw new NotFoundEception();
    } else if (existanceCheck.owner.id !== user) {
      throw new Unauthorized();
    }
    return this.wishRepo.save({
      id: id,
      ...updateWishDto,
    });
  }

  async remove(id: number, user: number) {
    const existanceCheck = await this.findOne(id);
    if (!existanceCheck) {
      throw new NotFoundEception();
    } else if (existanceCheck.owner.id !== user) {
      throw new Unauthorized();
    }
    return this.wishRepo.delete(id);
  }

  async copyWish(id: number, user: User) {
    const existanceCheck = await this.findOne(id);
    if (!existanceCheck) {
      throw new NotFoundEception();
    } else if (existanceCheck.owner.id !== user.id) {
      throw new Unauthorized();
    }
    const copyWishDto = {
      name: existanceCheck.name,
      link: existanceCheck.link,
      image: existanceCheck.image,
      price: existanceCheck.price,
      copied: existanceCheck.copied + 1,
    };
    const copyWish = await this.create(user, copyWishDto);
    return `Желание ${copyWish.name} скопировано`;
  }

  async findLast(): Promise<Array<Wish>> {
    return await this.wishRepo.find({
      take: 40,
      order: {
        createdAt: 'desc',
      },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async findTop(): Promise<Array<Wish>> {
    return await this.wishRepo.find({
      take: 20,
      order: {
        copied: 'desc',
      },
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  public findWishesById(id: number) {
    this.wishRepo.find({
      where: {
        owner: {
          id: id,
        },
      },
    });
  }
}
