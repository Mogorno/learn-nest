import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto';
import { UUIDParam } from 'src/shared/decorators/UUIDParam.decorator';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findOneById(@UUIDParam('id') id: string) {
    return await this.movieService.findOneById(id);
  }

  @Post()
  async create(@Body() dto: MovieDto) {
    return await this.movieService.create(dto);
  }

  @Put(':id')
  async updateFullOne(@UUIDParam('id') id: string, @Body() dto: MovieDto) {
    return await this.movieService.updateFullOne(id, dto);
  }

  @Patch(':id')
  async updatePartialOne(
    @UUIDParam('id') id: string,
    @Body() dto: Partial<MovieDto>,
  ) {
    return await this.movieService.updatePartialOne(id, dto);
  }

  @Delete(':id')
  async deleteOneById(@UUIDParam('id') id: string) {
    return await this.movieService.deleteOneById(id);
  }
}
