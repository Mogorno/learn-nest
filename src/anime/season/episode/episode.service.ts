import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEpisodeDto } from './dto';

@Injectable()
export class EpisodeService {
  constructor(private readonly prismaService: PrismaService) {}

  protected async getSeasonById(seasonId: string) {
    const season = await this.prismaService.season.findUnique({
      where: {
        id: seasonId,
      },
    });

    if (!season) {
      throw new NotFoundException(`Season with id ${seasonId} not found`);
    }

    return season;
  }

  async createOneBySeasonId(
    seasonId: string,
    dto: CreateEpisodeDto,
  ): Promise<boolean> {
    const { title, description, url } = dto;

    const season = await this.getSeasonById(seasonId);

    await this.prismaService.episode.create({
      data: {
        title,
        description,
        url,
        seasonId: season.id,
      },
    });

    return true;
  }

  async createManyBySeasonId(
    seasonId: string,
    dto: CreateEpisodeDto[],
  ): Promise<boolean> {
    const season = await this.getSeasonById(seasonId);

    await this.prismaService.episode.createMany({
      data: dto.map(({ title, description, url }) => ({
        title,
        description,
        url,
        seasonId: season.id,
      })),
    });

    return true;
  }
}
