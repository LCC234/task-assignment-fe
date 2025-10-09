import { TaskStatus } from "../TaskStatus";

export interface AddTaskForm {
    title: string;
    parentId?: string | null;
    assignToId: string;
    status: string;
    skillIds: string[];
    depth: number;
}

export const defaultAddTaskForm = (depth: number = 0): AddTaskForm => ({
    title: "",
    parentId: null,
    assignToId: "",
    status: TaskStatus.ToDo,
    skillIds: [],
    depth,
});

export const isTaskFormValid = (form: AddTaskForm): boolean => {
    return form.title.trim().length > 0 ;
}