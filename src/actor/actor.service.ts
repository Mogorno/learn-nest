import { Injectable, NotFoundException } from '@nestjs/common';
import { ActorEntity } from './entities';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorDto } from './dto';
import { ActorsIdsDto } from './dto/actors-ids.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async findAll() {
    return await this.actorRepository.find();
  }

  async findManyById(dto: ActorsIdsDto): Promise<ActorEntity[]> {
    const { actorsIds } = dto;

    const actors = await this.actorRepository.find({
      where: { id: In(actorsIds) },
    });

    if (!actors || actors.length !== actorsIds.length) {
      throw new NotFoundException('One or more actors not found');
    }

    return actors;
  }

  async createOne(dto: ActorDto) {
    const { name } = dto;
    const actor = this.actorRepository.create({
      name,
    });
    await this.actorRepository.save(actor);
    return true;
  }
}
