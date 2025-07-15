import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto';
import { Genre } from 'generated/prisma';

@Injectable()
export class GenreService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.genre.findMany();
  }

  async getOneById(id: string) {
    const genre = await this.prismaService.genre.findUnique({
      where: {
        id,
      },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }

    return genre;
  }

  async getOneByName(name: string) {
    const genre = await this.prismaService.genre.findFirst({
      where: {
        name: { equals: name, mode: 'insensitive' },
      },
    });

    if (!genre) {
      throw new NotFoundException(`Genre with name: ${name} not found`);
    }

    return genre;
  }

  async getManyByName(names: string[]): Promise<Genre[]> {
    const genres = await this.prismaService.genre.findMany({
      where: {
        OR: names.map((name) => ({
          name: {
            equals: name,
            mode: 'insensitive',
          },
        })),
      },
    });

    if (!genres || genres.length !== names.length) {
      throw new BadRequestException(
        `Genre with names: ${names.join(',')} not found`,
      );
    }

    return genres;
  }

  async create(dto: CreateGenreDto): Promise<boolean> {
    const { name } = dto;

    await this.prismaService.genre.create({
      data: {
        name,
      },
    });

    return true;
  }
}
