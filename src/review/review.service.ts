import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewEntity } from './entities';
import { ReviewDto } from './dto/review.dto';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    private readonly movieService: MovieService,
  ) {}

  async findAll() {
    return await this.reviewRepository.find();
  }

  async findOneById(id: string) {
    const review = await this.reviewRepository.findOneBy({
      id,
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async createOne(dto: ReviewDto) {
    const { movieId, ...rest } = dto;

    const movie = await this.movieService.findOneById(movieId);

    const review = this.reviewRepository.create({ ...rest, movie });

    await this.reviewRepository.save(review);
    return true;
  }

  async updateFullOne(id: string, dto: ReviewDto) {
    const review = await this.findOneById(id);

    Object.assign(review, dto);

    await this.reviewRepository.save(review);
    return true;
  }

  async updatePartialOne(id: string, dto: Partial<ReviewDto>) {
    const review = await this.findOneById(id);

    Object.assign(review, dto);

    await this.reviewRepository.save(review);
    return true;
  }

  async deleteOneById(id: string) {
    const review = await this.findOneById(id);

    await this.reviewRepository.delete(review.id);

    return true;
  }
}
