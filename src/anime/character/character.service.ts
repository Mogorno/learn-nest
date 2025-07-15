import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCharacterDto } from './dto';

@Injectable()
export class CharacterService {
  constructor(private readonly prismaService: PrismaService) {}

  private async getAnimeById(animeId: string) {
    const anime = await this.prismaService.anime.findUnique({
      where: {
        id: animeId,
      },
    });

    if (!anime) {
      throw new NotFoundException(`Anime with id ${animeId} not found`);
    }

    return anime;
  }

  async createOneByAnimeId(
    animeId: string,
    dto: CreateCharacterDto,
  ): Promise<boolean> {
    const { name, age, description } = dto;

    const anime = await this.getAnimeById(animeId);

    await this.prismaService.character.create({
      data: {
        name,
        age,
        description,
        animeId: anime.id,
      },
    });

    return true;
  }

  async createManyByAnimeId(
    animeId: string,
    dto: CreateCharacterDto[],
  ): Promise<boolean> {
    const anime = await this.getAnimeById(animeId);

    await this.prismaService.character.createMany({
      data: dto.map(({ name, age, description }) => ({
        name,
        age,
        description,
        animeId: anime.id,
      })),
    });

    return true;
  }
}
