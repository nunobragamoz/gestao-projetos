import type { ITask } from "./ITask";

/**
 * IProject - Contracto da estrutura do projeto
 * Composto por: um projeto que contem lista de tarefa (ITask[])
 */

export interface IProject {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    tasks: ITask[];
}

/**
 * IProjecFormData - Dados do formulário de criaçã/ediçao do projeto
 */

export type IProjectFormData = Pick<IProject, "name" | "description">;