import { COLORS } from "../styles/stylings";

export enum TaskStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done',
}

export const TaskStatusDisplay : Record<string, string> = {
    ToDo: 'To Do',
    InProgress: 'In Progress',
    Done: 'Done',
};

export const TaskStatusColor : Record<string, string> = {
    ToDo: COLORS.lightGrey3,
    InProgress: COLORS.blue,
    Done: COLORS.green,
};