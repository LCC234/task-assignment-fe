export interface Task {
    id: number;
    title: string;
    parentTaskId?: number | null;
    assignedDeveloperId?: number | null;
    status: string;
    skillIds: number[];
    depth: number;
}
