



export interface GetSkillsRequest {

}

interface SkillApiModel {
    id: number;
    name: string;
}

export interface GetSkillsResponse extends Array<SkillApiModel> {}

export interface SkillMap {
    [key: number]: string;
}

export const skillsAdapter = (data: GetSkillsResponse): SkillMap => {
    const skillMap: SkillMap = {};
    data.forEach(skill => {
        skillMap[skill.id] = skill.name;
    });
    return skillMap;
};