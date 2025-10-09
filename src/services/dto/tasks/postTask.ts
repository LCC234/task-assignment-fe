import { Task } from "../../../models/task";

export interface PostTaskRequest {
    title: string;
    parentTaskId?: number | null;
    assignedDeveloperId?: number | null;
    status: string;
    skillIds: number[];
    depth: number;
}

export interface PostTaskResponse {
    id: number;
    title: string;
    parent_task_id: number | null;
    status: string;
    assigned_developer_id: number | null;
    depth: number;
    task_skills: {
        skill_id: number;
        task_id: number;
    }[];
}

export const postTaskAdapter = (response: PostTaskResponse): Task => {
    return {
        id: response.id,
        title: response.title,
        parentTaskId: response.parent_task_id,
        assignedDeveloperId: response.assigned_developer_id,
        status: response.status,
        skillIds: response.task_skills.map(skill => skill.skill_id),
        depth: response.depth,
    };
};