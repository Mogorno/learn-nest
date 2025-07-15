import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities';
import { MovieModule } from 'src/movie/movie.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity]), MovieModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
