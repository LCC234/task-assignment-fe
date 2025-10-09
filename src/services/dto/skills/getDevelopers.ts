import { Developer } from "../../../models/developer";


export interface GetDevelopersRequest {
    requiredSkillsIDs?: number[];
}

export interface GetDevelopersResponse {
    id: string;
    name: string;
    developer_skills: {
        skills: {
            name: string;
            id: number;
        }
    }[];
}

export const developerAdapter = (data: GetDevelopersResponse[]): Developer[] => {
    return data.map(item => ({
        id: item.id,
        name: item.name,
        skills: item.developer_skills.map(skill => skill.skills.name)
    }));
};