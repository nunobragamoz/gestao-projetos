import type { ITask } from "../interfaces/ITask";
import type { IProject } from "../interfaces/IProject";

// TIPOS

//Union type
export type TaskStatus = ITask["status"];

//Mapped type
export type ProjectSummary = Readonly<Pick<IProject, "id" | "name" | "description">>;

//Contador de tarefas por estado
export type TaskCountByStatus = Record<TaskStatus, number>;

//Conditional type
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

export type ExtractedTask = ArrayElement<ITask[]>;


//Todas properties opcionais e required
export type partialProject = Partial<IProject>;
export type RequiredTask = Required<ITask>;

//Action type - cada action um type e payload
export type ProjectAction = | {type: "SET_PROJECTS"; payload: IProject[]}
                            | {type: "ADD_PROJECT"; payload: IProject[]} 
                            | {type: "UPDATE_PROJECT"; payload: IProject}
                            | {type: "DELETE_PROJECT"; payload: string}
                            | {type: "SET_LOADING"; payload: boolean}
                            | {type: "SET_ERROR"; payload: string | null};
