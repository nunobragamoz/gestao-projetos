import { useCallback } from "react";
import { useProjectContext } from "./useProjectContext";
import type { IProject, IProjectFormData } from "../interfaces/IProject";
import { Project } from "../models/Project";
import { api } from "../services/api";

// Hook para encapsular todo o CRUD dos projetos

export function useProjects() {

    const { state, dispatch } = useProjectContext();

    // Load dos projetos da API

    const loadProjects = useCallback(async () => {

        dispatch({ type: "SET_LOADING", payload: true });
        dispatch({ type: "SET_ERROR", payload: null});

        try {

            const data = await api.getProjects();
            dispatch({ type: "SET_PROJECTS", payload: data });

        } catch (err: unknown) { //Any vai desligar o type checking por isso é melhor usar unknown
            const message = err instanceof Error ? err.message : "Erro desconhecido";
            dispatch({ type: "SET_ERROR", payload: message });
        }

    }, [dispatch]);


    // Novo Projeto - Classe Project + Factory

    const createProject = useCallback(async (formData: IProjectFormData) => {
        
        const project = Project.fromFormData(formData);

        const saved = await api.createProject(project.toJSON());

        dispatch({ type: "ADD_PROJECT", payload: saved });
        
        return saved;

    }, [dispatch]);

    // Actualizar o Projeto

    const updateProject = useCallback(async (project: IProject) => {

    const saved = await api.updateProject(project);

    dispatch({ type: "UPDATE_PROJECT", payload: saved });

    return saved;

  }, [dispatch]);

    // Exclir o Projeto

    const deleteProject = useCallback(async (id: string) => {

        await api.deleteProject(id);

        dispatch({ type: "DELETE_PROJECT", payload: id });

    }, [dispatch]);

    return {
        projects: state.projects,
        loading: state.loading,
        error: state.error,
        loadProjects,
        createProject,
        updateProject,
        deleteProject,
    };
}