import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { Task } from './types';

const tasks: Task[] = [
  {
    id: 0,
    title: 'Test',
    description: 'Testing Nest',
    isComplied: true,
    tags: ['pending'],
    priority: 10,
  },
  {
    id: 1,
    title: 'Learn Nest',
    description: 'Learn Nest',
    isComplied: false,
    tags: ['completed', 'dev', 'hot'],
    priority: 4,
  },
  {
    id: 2,
    title: 'Build Nest',
    description: 'Learn Nest',
    isComplied: true,
    tags: ['high', 'hot'],
    priority: 10,
  },
  {
    id: 3,
    title: 'REST',
    description: 'Learn REST API',
    isComplied: true,
    tags: ['dev', 'low'],
    priority: 0,
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
    const task: Task = {
      id: this.tasks.length + 1,
      description: 'description',
      isComplied: false,
      tags: ['pending'],
      priority: 1,
      ...dto,
    };
    this.tasks.push(task);
    return true;
  }

  update(id: number, dto: UpdateTaskDto) {
    const task = this.findById(id);

    Object.assign(task, dto);

    return task;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const task = this.findById(id);

    Object.assign(task, dto);

    return task;
  }

  deleteById(id: number) {
    const task = this.findById(id);
    this.tasks = this.tasks.filter((t) => t.id !== task.id);
    return true;
  }
}
