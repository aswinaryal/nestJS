import { BadRequestException } from "@nestjs/common";
import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
import { TasksStatus } from "../tasks.model";

export class TasksStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TasksStatus.OPEN,
        TasksStatus.IN_PROGRESS,
        TasksStatus.DONE
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        const statusValue = value.toUpperCase();
        // stat = value.toUpperCase();
        if (!this.isStatusValid(statusValue)) {
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return statusValue
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }

}