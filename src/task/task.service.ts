import { Injectable, NotFoundException } from '@nestjs/common';
import CreateTaskDto from './dto/create-task.dto';

type Task = {
  id: number;
  title: string;
  description: string;
  isComplied: boolean;
};

const tasks: Task[] = [
  {
    id: 0,
    title: 'Test',
    description: 'Testing Nest',
    isComplied: true,
  },
  {
    id: 1,
    title: 'Learn Nest',
    description: 'Learn Nest',
    isComplied: false,
  },
  {
    id: 2,
    title: 'Build Nest',
    description: 'Learn Nest',
    isComplied: true,
  },
  {
    id: 3,
    title: 'REST',
    description: 'Learn REST API',
    isComplied: true,
  },
];

@Injectable()
export class TaskService {
  private tasks: Task[] = tasks;

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  create(dto: CreateTaskDto) {
    const { title } = dto;
    const task = {
      id: this.tasks.length + 1,
      title,
      description: 'description',
      isComplied: false,
    };
    this.tasks.push(task);
    return this.tasks;
  }
}
