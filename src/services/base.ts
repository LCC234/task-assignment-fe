import { createApi } from "@reduxjs/toolkit/query/react";
import clientBaseQuery from "./client";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: clientBaseQuery(),
    tagTypes: [
    ],
    endpoints: () => ({}),
});