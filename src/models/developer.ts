export interface Developer {
    id: string;
    name: string;
    skills: string[];
    skillIds: number[];
}

export interface DeveloperNameMap {
    [key: string]: string;
}

export const convertDevelopersToMap = (developers: Developer[]): DeveloperNameMap => {
    const map: DeveloperNameMap = {};
    developers.forEach(dev => {
        map[dev.id] = dev.name;
    });
    return map;
}

export const filterDevelopersBySkills = (developers: Developer[], requiredSkillIds: number[]): Developer[] => {
    if (requiredSkillIds.length === 0) {
        return developers;
    }
    //must have all skills
    return developers.filter(dev => {
        return requiredSkillIds.every(skillId => dev.skillIds.includes(skillId));
    });
}