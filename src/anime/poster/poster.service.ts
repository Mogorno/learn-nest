import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePosterDto } from './dto';

@Injectable()
export class PosterService {
  constructor(private readonly prismaService: PrismaService) {}

  async createByAnimeId(
    animeId: string,
    dto: CreatePosterDto,
  ): Promise<boolean> {
    const { url } = dto;

    await this.prismaService.poster.create({
      data: {
        url,
        animeId,
      },
    });

    return true;
  }
}
