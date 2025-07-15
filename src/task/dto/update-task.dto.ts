import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator';
import type { Task } from '../types';

export class UpdateTaskDto implements Partial<Task> {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @IsBoolean()
  isComplied: boolean;
}
