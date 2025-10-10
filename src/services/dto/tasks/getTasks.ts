import { TaskStatus } from "../../../models/TaskStatus";
import { PaginationRequest, PaginationResponse } from "../common";


export interface TaskTreeMap {
    id: number;
    title: string;
    parentTaskId: number | null;
    assignedDeveloperName: string | null;
    assignedDeveloperId: number | null;
    status: TaskStatus;
    depth: number;
    requiredSkills: string[];
    skillIds: number[];
    childTasks: TaskTreeMap[];
}

interface TaskTreeMapApi {
    id: number;
    title: string;
    parentTaskId: number | null;
    assignedDeveloperName: string | null;
    assignedDeveloperId: number | null;
    status: TaskStatusApi;
    depth: number;
    requiredSkills: string[];
    skillIds: number[];
    childTasks: TaskTreeMapApi[];
}

export enum TaskStatusApi {
    ToDo = 'To-Do',
    InProgress = 'In-Progress',
    Done = 'Done',
}

export interface getTasksRequest extends PaginationRequest {
}

export interface getTasksResponse extends PaginationResponse<TaskTreeMapApi> { }

export interface TaskPagination extends PaginationResponse<TaskTreeMap> { }

export const getTasksAdapter = (response: getTasksResponse): TaskPagination => {
    return {
        ...response,
        rows: response.rows.map(convertTasksApiToTreeMap)
    };
}

export const convertTasksApiToTreeMap = (tasks: TaskTreeMapApi) : TaskTreeMap => {
    return {
        ...tasks,
        status: convertTaskStatusApiToTaskStatus(tasks.status),
        childTasks: tasks.childTasks.map(convertTasksApiToTreeMap)
    };
}

export const convertTaskStatusApiToTaskStatus = (status: TaskStatusApi): TaskStatus => {
    switch (status) {
        case TaskStatusApi.ToDo:
            return TaskStatus.ToDo;
        case TaskStatusApi.InProgress:
            return TaskStatus.InProgress;
        case TaskStatusApi.Done:
            return TaskStatus.Done;
        default:
            throw new Error(`Unknown TaskStatusApi: ${status}`);
    }
}