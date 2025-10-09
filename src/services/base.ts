import { createApi } from "@reduxjs/toolkit/query/react";
import clientBaseQuery from "./client";
import { DEVELOPER_SERVICE_TAG, SKILL_SERVICE_TAG, TASK_SERVICE_TAG } from "../utils/constants/ServiceTags";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: clientBaseQuery(),
    tagTypes: [
        SKILL_SERVICE_TAG,
        TASK_SERVICE_TAG,
        DEVELOPER_SERVICE_TAG
    ],
    endpoints: () => ({}),
});