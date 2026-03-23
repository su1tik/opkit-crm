import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private tasksGateway: TasksGateway,
  ) {}

  async create(userId: number, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: { ...dto, userId },
    });
  }

  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, userId: number, dto: UpdateTaskDto) {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new NotFoundException('Задача не найдена');

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: dto,
    });

    if (dto.status) {
      this.tasksGateway.sendTaskUpdate({
        id: updatedTask.id,
        status: updatedTask.status,
        updatedAt: updatedTask.updatedAt,
      });
    }

    return updatedTask;
  }

  async remove(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new NotFoundException('Задача не найдена');

    return this.prisma.task.delete({ where: { id } });
  }
}
