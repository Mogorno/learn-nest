import { Module } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { SeasonModule } from './season/season.module';
import { PosterModule } from './poster/poster.module';
import { GenreModule } from 'src/genre/genre.module';
import { CharacterModule } from './character/character.module';

@Module({
  controllers: [AnimeController],
  providers: [AnimeService],
  imports: [SeasonModule, PosterModule, GenreModule, CharacterModule],
  exports: [AnimeService],
})
export class AnimeModule {}
