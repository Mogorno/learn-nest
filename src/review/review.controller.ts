import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { UUIDParam } from 'src/shared/decorators/UUIDParam.decorator';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOneById(@UUIDParam('id') id: string) {
    return this.reviewService.findOneById(id);
  }

  @Post()
  createOne(@Body() dto: ReviewDto) {
    return this.reviewService.createOne(dto);
  }

  @Put(':id')
  updateFullOne(@UUIDParam('id') id: string, @Body() dto: ReviewDto) {
    return this.reviewService.updateFullOne(id, dto);
  }

  @Patch(':id')
  updatePartialOne(@UUIDParam('id') id: string, @Body() dto: ReviewDto) {
    return this.reviewService.updatePartialOne(id, dto);
  }

  @Delete(':id')
  deleteOneById(@UUIDParam('id') id: string) {
    return this.reviewService.deleteOneById(id);
  }
}
