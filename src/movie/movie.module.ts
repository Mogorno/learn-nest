import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity, PosterEntity } from './entities';
import { ActorModule } from 'src/actor/actor.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, PosterEntity]), ActorModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
