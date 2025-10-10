import { TaskStatus } from "../../../models/TaskStatus";




export interface PostUpdateTaskStatusRequest {
    taskId: number;
    status: TaskStatus;
}

export interface PostUpdateTaskStatusResponse{}