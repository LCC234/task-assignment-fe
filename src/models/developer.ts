export interface Developer {
    id: string;
    name: string;
    skills: string[];
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