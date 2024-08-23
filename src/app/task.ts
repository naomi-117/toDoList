export interface Task {
    id?: number;
    description: string;
    done: boolean;
    priority: string;
    deadline: string;
    editing: boolean;
}