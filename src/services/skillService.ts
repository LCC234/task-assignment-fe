
import { SKILLS_API } from "../utils/constants/ApiSubPath";
import { SKILL_SERVICE_TAG } from "../utils/constants/ServiceTags";
import { baseApi } from "./base";
import { SkillMap, GetSkillsRequest, GetSkillsResponse, skillsAdapter } from "./dto/skills/getSkills";



const skillServiceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSkills: build.query<SkillMap, GetSkillsRequest>({
            query: () => ({
                url: SKILLS_API,
                method: "GET",
            }),
            transformResponse: (response: GetSkillsResponse) => {
                return skillsAdapter(response);
            },
            providesTags: [SKILL_SERVICE_TAG],
        }),
    }),
});

export const { useGetSkillsQuery } = skillServiceApi;