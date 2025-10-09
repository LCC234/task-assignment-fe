import { PaginationRequest, PaginationResponse } from "../common";


export interface TaskTreeMap {
    id: number;
    title: string;
    parentTaskId: number | null;
    assignedDeveloperName: string | null;
    assignedDeveloperId: number | null;
    status: string;
    depth: number;
    requiredSkills: string[];
    skillIds: number[];
    childTask: TaskTreeMap[];
}

export interface getTasksRequest extends PaginationRequest {
}

export interface getTasksResponse extends PaginationResponse<TaskTreeMap> { }