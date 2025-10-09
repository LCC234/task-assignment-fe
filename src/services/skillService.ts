
import { SKILLS_API } from "../utils/constants/ApiSubPath";
import { baseApi } from "./base";
import { SkillMap, GetSkillsRequest, GetSkillsResponse, skillsAdapter } from "./dto/skills/getSkills";



const skillServiceApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getSkills: build.query<SkillMap, GetSkillsRequest>({
            query: (request) => ({
                url: SKILLS_API,
                method: "GET",
            }),
            transformResponse: (response: GetSkillsResponse) => {
                return skillsAdapter(response);
            }
        }),
    }),
});

export const { useGetSkillsQuery } = skillServiceApi;