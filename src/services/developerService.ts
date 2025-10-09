import { Developer } from "../models/developer";
import { DEVELOPERS_API } from "../utils/constants/ApiSubPath";
import { DEVELOPER_SERVICE_TAG } from "../utils/constants/ServiceTags";
import { baseApi } from "./base";
import { developerAdapter, GetDevelopersRequest, GetDevelopersResponse } from "./dto/skills/getDevelopers";




const developerService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDevelopers: build.query<Developer[], GetDevelopersRequest>({
            query: (request) => {
                const searchParams = new URLSearchParams();
                if (request.requiredSkillsIDs && request.requiredSkillsIDs.length > 0) {
                    request.requiredSkillsIDs.forEach(id => {
                        searchParams.append("requiredSkillsIDs", id.toString());
                    });
                }
                if (request.all) {
                    searchParams.append("all", "true");
                }
                return {
                    url: DEVELOPERS_API + `?${searchParams.toString()}`,
                    method: "GET",
                }
            },
            transformResponse: (response: GetDevelopersResponse[]) => {
                return developerAdapter(response);
            },
            providesTags: [DEVELOPER_SERVICE_TAG]
        }),
    }),
});

export const { useGetDevelopersQuery } = developerService;