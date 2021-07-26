import { ValidationPipe } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TasksStatusValidationPipe } from './pipes/tasks-status-validation.pipe';
import { Task, TasksStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        } else {
            return this.tasksService.getAllTasks()
        }
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        return this.tasksService.deleTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status', TasksStatusValidationPipe) status: TasksStatus): Task {
        return this.tasksService.updateTaskStatus(id, status)
    }
}
