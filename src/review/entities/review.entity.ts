import { MovieEntity } from 'src/movie/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'review' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'movie_id',
    type: 'uuid',
  })
  movieId: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'movie_id',
  })
  movie: MovieEntity;

  @Column({
    type: 'text',
  })
  text: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    default: 0,
  })
  rating: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
