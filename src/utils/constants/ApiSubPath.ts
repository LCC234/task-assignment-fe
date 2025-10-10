export const SKILLS_API = "/api/skills";
export const TASKS_API = "/api/tasks";
export const TASKS_ASSIGN_API = (taskId: number) => `/api/tasks/${taskId}/assign`;
export const TASK_UPDATE_STATUS_API = (taskId: number) => `/api/tasks/${taskId}/status`;
export const DEVELOPERS_API = "/api/developers";
export const AI_DEDUCE_SKILLS_API = "/api/ai/deduce-skills";