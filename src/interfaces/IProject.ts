import type { ITask } from "./ITask";

/**
 * IProject - Contracto da estrutura do projecto
 * Composto por: um projecto que contem lista de tarefa (ITask[])
 */

export interface IProject {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    tasks: ITask[];
}

/**
 * IProjecFormData - Dados do formulário de criaçã/ediçao do projecto
 */

export type IProjectFormData = Pick<IProject, "name" | "description">;