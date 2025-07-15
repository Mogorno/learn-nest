import { Body, Controller, Get, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';
import { CreateFullAnimeDto } from './dto';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Post()
  create(@Body() dto: CreateFullAnimeDto) {
    return this.animeService.create(dto);
  }

  @Post('full')
  createFull(@Body() dto: CreateFullAnimeDto) {
    return this.animeService.createFull(dto);
  }

  @Post('full/test')
  createFullTest(@Body() dto: CreateFullAnimeDto) {
    return this.animeService.createFullTest(dto);
  }
}
