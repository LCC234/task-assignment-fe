import { TaskStatus } from "../TaskStatus";

export interface AddTaskForm {
    title: string;
    parentId?: string | null;
    assignToId?: string | null;
    status: string;
    skillIds: string[];
}

export const defaultAddTaskForm: AddTaskForm = {
    title: "",
    parentId: null,
    assignToId: null,
    status: TaskStatus.ToDo,
    skillIds: [],
};