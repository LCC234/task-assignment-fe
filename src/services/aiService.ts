import { AI_DEDUCE_SKILLS_API } from "../utils/constants/ApiSubPath";
import { baseApi } from "./base";
import { postAIDeduceSkillsResponse, postAIDeduceSkillsRequest } from "./dto/skills/postAIDeduceSkills";


const aiService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deduceSkillsRequired: build.mutation<postAIDeduceSkillsResponse, postAIDeduceSkillsRequest>({
            query: (body) => ({
                url: AI_DEDUCE_SKILLS_API,
                method: "POST",
                data: body,
            }),
        }),
    }),
});

export const { useDeduceSkillsRequiredMutation } = aiService;