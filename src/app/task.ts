import { TaskPriority } from "./to-do-list/to-do-list.component";

export interface Task {
    id?: number;
    description: string;
    done: boolean;
    priority: TaskPriority;
    deadline?: Date;
}