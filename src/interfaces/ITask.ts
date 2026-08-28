/**
 * ITask - Contracto que define a estrutura de uma tarefa.
 * Todas as partes da app que manipulam tarefas devem respeitar esta interface.
 */

export interface ITask {
    id: string;
    title: string;
    description: string;
    dueDate: string;                                    //formato (YYYY-MM-DD)
    status: "pendente" | "em progresso" | "concluída";  //union type de seguran;a
}

/**
 * IprojectFormData - DAdos do formul]ario (sem ID, pois é gerado automaticamente)
 * Usa Omit<T, K> para derivar de ITask sem repetir os campos
 */

export type ITaskFormData = Omit<ITask, "id">;
