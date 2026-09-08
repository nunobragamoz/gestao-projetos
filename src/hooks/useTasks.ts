import { useCallback } from "react";
import { useProjectContext } from "./useProjectContext";
import type { IProject } from "../interfaces/IProject";
import type { ITask, ITaskFormData } from "../interfaces/ITask";
import { Task } from "../models/Task";
import { Project } from "../models/Project";
import { api } from "../services/api";

// Gerador de Tarefas dentro do Projecto Correspondente

export function useTasks(projectData: IProject | null) {

    const { dispatch } = useProjectContext();

    // Adicionar uma Tarefa

    const addTask = useCallback(async (formData: ITaskFormData) => {

        if (!projectData) return;

        const project = new Project(projectData);
        const task = Task.fromFormData(formData);
        project.addTask(task);

        const saved = await api.updateProject(project.toJSON());
        
        dispatch({ type: "UPDATE_PROJECT", payload: saved });

        return saved;
    }, [projectData, dispatch]);

    // Editar uma Tarefa

    const updateTask = useCallback(async (taskId: string, taskData: ITask) => {

        if (!projectData) return;

        const project = new Project(projectData);
        project.updateTask(taskId, taskData);

        const saved = await api.updateProject(project.toJSON());

        dispatch({ type: "UPDATE_PROJECT", payload: saved });

        return saved;

    }, [projectData, dispatch]);

    // Excluir Tarefa

    const removeTask = useCallback(async (taskId: string) => {

        if (!projectData) return;

        const project = new Project(projectData);
        project.removeTask(taskId);

        const saved = await api.updateProject(project.toJSON());

        dispatch({ type: "UPDATE_PROJECT", payload: saved});

        return saved;

    }, [projectData, dispatch]);

    const completeTask = useCallback(async (taskId: string) => {

        if (!projectData) return;

        const project = new Project(projectData);

        const task = project.tasks.find(t => t.id === taskId);

        if (task) {

            task.markAsCompleted();

            const saved = await api.updateProject(project.toJSON());

            dispatch({ type: "UPDATE_PROJECT", payload: saved });
        }

    }, [projectData, dispatch]);

    return { addTask, updateTask, removeTask, completeTask};
}