export interface Task {
    id: number;
    title: string;
    parentTaskId: number | null;
    parentTaskTitle: string | null;
    assignedDeveloperId?: number | null;
    status: string;
    skillIds: number[];
    depth: number;
}
