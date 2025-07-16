import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto';
import { StringToLowercasePipe } from 'src/shared/pipes';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({
    summary: 'Get all genres',
    description: 'Return genres list',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Genres list',
  })
  @Get()
  getAll() {
    return this.genreService.getAll();
  }

  @ApiOperation({
    summary: 'Get genre by id',
    description: 'Return genre by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Genre id',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Genre',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Genre not found',
  })
  @Get('id/:id')
  getOneById(@Param('id') id: string) {
    return this.genreService.getOneById(id);
  }

  @Get('name/:name')
  getOneByName(@Param('name') name: string) {
    return this.genreService.getOneByName(name);
  }

  @UsePipes(StringToLowercasePipe)
  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }
}
