import { ActorEntity } from 'src/actor/entities';
import { ReviewEntity } from 'src/review/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PosterEntity } from './poster.entity';

enum Genre {
  ACTION = 'Action',
  COMEDY = 'Comedy',
  DRAMA = 'Drama',
  HORROR = 'Horror',
}

@Entity({ name: 'movie' })
export class MovieEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0,
  })
  rating: number;

  @Column({
    type: 'enum',
    enum: Genre,
    array: true,
    nullable: true,
    default: [],
  })
  genres: Genre[];

  @Column({
    name: 'is_available',
    type: 'boolean',
    default: false,
  })
  isAvailable: boolean;

  @Column({
    name: 'release_year',
  })
  releaseYear: Date;

  @OneToMany(() => ReviewEntity, (review) => review.movie)
  reviews: ReviewEntity[];

  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: ActorEntity[];

  @Column({
    name: 'poster_id',
    type: 'uuid',
    nullable: true,
  })
  posterId: string;

  @OneToOne(() => PosterEntity, (poster) => poster.movie, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'poster_id',
  })
  poster: PosterEntity | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
