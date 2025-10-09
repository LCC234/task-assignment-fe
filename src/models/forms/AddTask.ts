import { TaskStatus } from "../TaskStatus";

export interface AddTaskForm {
    title: string;
    parentId?: string | null;
    assignToId: string;
    status: string;
    skillIds: string[];
}

export const defaultAddTaskForm: AddTaskForm = {
    title: "",
    parentId: null,
    assignToId: "",
    status: TaskStatus.ToDo,
    skillIds: [],
};