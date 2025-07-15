import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  getAll() {
    return this.genreService.getAll();
  }

  @Get('id/:id')
  getOneById(@Param('id') id: string) {
    return this.genreService.getOneById(id);
  }

  @Get('name/:name')
  getOneByName(@Param('name') name: string) {
    return this.genreService.getOneByName(name);
  }

  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }
}
