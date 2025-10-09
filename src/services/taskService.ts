import { Task } from "../models/task";
import { TASKS_API } from "../utils/constants/ApiSubPath";
import { TASK_SERVICE_TAG } from "../utils/constants/ServiceTags";
import { baseApi } from "./base";
import { PostTaskRequest, PostTaskResponse, postTaskAdapter } from "./dto/tasks/postTask";



const taskServiceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createTask: build.mutation<Task, PostTaskRequest>({
            query: (body) => ({
                url: TASKS_API,
                method: "POST",
                data: body,
            }),
            transformResponse: (response: PostTaskResponse) => {
                return postTaskAdapter(response);
            },
            invalidatesTags: [TASK_SERVICE_TAG],
        }),
    }),
});

export const {
    useCreateTaskMutation,
} = taskServiceApi;