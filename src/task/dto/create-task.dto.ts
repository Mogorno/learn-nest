import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { Tags, Task } from '../types';
import { StartWith } from '../decorators';

export class CreateTaskDto implements Partial<Task> {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @StartWith('Learn', {})
  title: string;

  @IsString()
  @IsOptional()
  @Length(3, 100)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isComplied?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsEnum(Tags)
  tags?: Tags[];

  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  priority?: number;
}
