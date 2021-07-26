import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();
        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search))
        }

        return tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {

        const { title, description } = createTaskDto;

        const task: Task = {
            title,
            description,
            status: TasksStatus.OPEN,
            id: uuidv4()
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find((el) => el.id === id);
        if (!found) {
            throw new NotFoundException(`Task with id ${id} not found`)
        }
        return found;
    }

    deleTask(id: string): void {
        const found = this.getTaskById(id);
        this.tasks = this.tasks.filter((el) => el.id !== found.id);
    }

    updateTaskStatus(id: string, status: TasksStatus) {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
