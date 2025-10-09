import { PaginationRequest, PaginationResponse } from "../common";


interface GetTaskApiModel {
    id: number;
    title: string;
    parentTaskId: number | null;
    assignedDeveloperName: string | null;
    assignedDeveloperId: number | null;
    status: string;
    depth: number;
    requiredSkills: string[];
    skillsIds: number[];
    childTask: GetTaskApiModel[];
}

export interface getTasksRequest extends PaginationRequest {
}

export interface getTasksResponse extends PaginationResponse<GetTaskApiModel> { }