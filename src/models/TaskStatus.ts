export enum TaskStatus {
    ToDo = 'ToDo',
    InProgress = 'InProgress',
    Done = 'Done',
}

export const TaskStatusDisplay = {
    ToDo: 'To Do',
    InProgress: 'In Progress',
    Done: 'Done',
} as const;