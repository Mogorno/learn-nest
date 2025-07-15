import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnimeDto, CreateFullAnimeDto } from './dto';
import { GenreService } from 'src/genre/genre.service';
import { Genre } from 'generated/prisma';
import { SeasonService } from './season/season.service';
import { CharacterService } from './character/character.service';
import { PosterService } from './poster/poster.service';

@Injectable()
export class AnimeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly genreService: GenreService,
    private readonly seasonService: SeasonService,
    private readonly characterService: CharacterService,
    private readonly posterService: PosterService,
  ) {}

  async findAll() {
    return await this.prismaService.anime.findMany({
      where: {
        isAvailable: true,
      },
      include: {
        characters: true,
        genres: true,
        poster: true,
        seasons: true,
        reviews: true,
      },
    });
  }

  async create(dto: CreateAnimeDto): Promise<boolean> {
    const { title, description, status, rating, isAvailable } = dto;

    await this.prismaService.anime.create({
      data: {
        title,
        description,
        rating,
        isAvailable,
        status,
      },
    });

    return true;
  }

  async createFull(dto: CreateFullAnimeDto): Promise<boolean> {
    const {
      seasons,
      poster,
      characters,
      genres,
      title,
      description,
      status,
      rating,
      isAvailable,
    } = dto;
    let existingGenres: Genre[] | undefined = undefined;

    if (genres) {
      existingGenres = await this.genreService.getManyByName(genres);
    }

    await this.prismaService.anime.create({
      data: {
        title,
        description,
        rating,
        isAvailable,
        status,
        poster: poster ? { create: { url: poster.url } } : undefined,
        genres: existingGenres
          ? { connect: existingGenres.map(({ id }) => ({ id })) }
          : undefined,
        characters: characters
          ? {
              createMany: {
                data: characters.map(({ name, age, description }) => ({
                  name,
                  age,
                  description,
                })),
              },
            }
          : undefined,
        seasons: seasons
          ? {
              create: seasons.map(
                ({ releaseDate, description, title, episodes }) => ({
                  releaseDate,
                  description,
                  title,
                  episodes: episodes
                    ? {
                        create: episodes.map(({ title, description, url }) => ({
                          title,
                          description,
                          url,
                        })),
                      }
                    : undefined,
                }),
              ),
            }
          : undefined,
      },
    });

    return true;
  }

  async createFullTest(dto: CreateFullAnimeDto): Promise<boolean> {
    const {
      title,
      description,
      status,
      rating,
      isAvailable,
      seasons,
      characters,
      poster,
      genres,
    } = dto;

    let existingGenres: Genre[] | undefined = undefined;

    if (genres) {
      existingGenres = await this.genreService.getManyByName(genres);
    }

    const anime = await this.prismaService.anime.create({
      data: {
        title,
        description,
        rating,
        isAvailable,
        status,
        genres: existingGenres
          ? { connect: existingGenres.map(({ id }) => ({ id })) }
          : undefined,
      },
    });

    if (seasons) {
      await this.seasonService.createManyByAnimeId(anime.id, seasons);
    }

    if (characters) {
      await this.characterService.createManyByAnimeId(anime.id, characters);
    }

    if (poster) {
      await this.posterService.createByAnimeId(anime.id, poster);
    }

    return true;
  }
}
