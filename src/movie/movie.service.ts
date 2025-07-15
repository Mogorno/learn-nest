import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity, PosterEntity } from './entities';
import { In, Repository } from 'typeorm';
import { MovieDto } from './dto';
import { UUIDListDto } from 'src/shared/dto';
import { ActorService } from 'src/actor/actor.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(PosterEntity)
    private readonly posterRepository: Repository<PosterEntity>,
    private readonly actorsService: ActorService,
  ) {}

  private async createPoster(url: string): Promise<PosterEntity> {
    const poster = this.posterRepository.create({
      url,
    });

    return await this.posterRepository.save(poster);
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      order: {
        releaseYear: 'desc',
      },
    });
  }

  async findOneById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['reviews', 'poster', 'actors'],
    });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async findManyById(dto: UUIDListDto): Promise<MovieEntity[]> {
    console.log('dto.ids:', dto.ids);
    if (!Array.isArray(dto.ids)) {
      throw new Error('dto.ids is not an array');
    }
    const movies = await this.movieRepository.find({
      where: { id: In(dto.ids) },
    });

    if (!movies) {
      throw new NotFoundException('Movie not found');
    }
    return movies;
  }

  async create(dto: MovieDto): Promise<boolean> {
    const { title, description, releaseYear, imageUrl, ...rest } = dto;

    const actors = await this.actorsService.findManyById(rest);

    let poster: PosterEntity | null = null;

    if (imageUrl) {
      poster = await this.createPoster(imageUrl);
    }

    const movie = this.movieRepository.create({
      title,
      description,
      releaseYear,
      actors,
      poster,
    });

    await this.movieRepository.save(movie);

    return true;
  }

  async updateFullOne(id: string, dto: MovieDto): Promise<boolean> {
    const movie = await this.findOneById(id);

    Object.assign(movie, dto);

    await this.movieRepository.save(movie);
    return true;
  }

  async updatePartialOne(id: string, dto: Partial<MovieDto>): Promise<boolean> {
    const movie = await this.findOneById(id);

    Object.assign(movie, dto);

    await this.movieRepository.save(movie);
    return true;
  }

  async deleteOneById(id: string): Promise<boolean> {
    const movie = await this.findOneById(id);

    await this.movieRepository.delete(movie.id);

    return true;
  }
}
