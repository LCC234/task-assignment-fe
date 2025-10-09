import { TaskStatus } from "../TaskStatus";

export interface AddTaskForm {
    title: string;
    parentId?: number | null;
    assignToId: string;
    status: string;
    skillIds: string[];
    depth: number;
}

export const defaultAddTaskForm = (depth: number = 0, parentId: number | null = null): AddTaskForm => ({
    title: "",
    parentId: parentId,
    assignToId: "",
    status: TaskStatus.ToDo,
    skillIds: [],
    depth,
});

export const isTaskFormValid = (form: AddTaskForm): boolean => {
    return form.title.trim().length > 0 ;
}