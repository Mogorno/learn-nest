import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSeasonDto } from './dto';
import { EpisodeService } from './episode/episode.service';

@Injectable()
export class SeasonService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly episodeService: EpisodeService,
  ) {}

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
    dto: CreateSeasonDto,
  ): Promise<boolean> {
    const { title, description, releaseDate, episodes } = dto;

    const anime = await this.getAnimeById(animeId);

    const season = await this.prismaService.season.create({
      data: {
        title,
        description,
        releaseDate,
        animeId: anime.id,
      },
    });

    if (episodes) {
      await this.episodeService.createManyBySeasonId(season.id, episodes);
    }

    return true;
  }

  async createManyByAnimeId(
    animeId: string,
    dto: CreateSeasonDto[],
  ): Promise<boolean> {
    const anime = await this.getAnimeById(animeId);

    const seasons: Promise<any>[] = [];

    for (const season of dto) {
      const { title, description, releaseDate, episodes } = season;

      const promise = this.prismaService.season.create({
        data: {
          title,
          description,
          releaseDate,
          animeId: anime.id,
          episodes: episodes
            ? {
                create: episodes.map(({ title, description, url }) => ({
                  title,
                  description,
                  url,
                })),
              }
            : undefined,
        },
      });

      seasons.push(promise);
    }

    await Promise.all(seasons);

    return true;
  }
}
