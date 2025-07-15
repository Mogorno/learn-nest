import { Body, Controller, Get, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from './dto';

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Post()
  createOne(@Body() dto: ActorDto) {
    return this.actorService.createOne(dto);
  }
}
