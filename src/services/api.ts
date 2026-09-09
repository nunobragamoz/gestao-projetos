import type { IProject } from "../interfaces/IProject";

const BASE_URL = "http://localhost:3001/projects";

// Servico de API REST

export const api = {

    //obter projetos
    
    async getProjects(): Promise<IProject[]> {

        const res = await fetch(BASE_URL);

        if (!res.ok) throw new Error("Erro! Falha no carregamento dos Projetos!");

        return res.json();
    },

    // obter um unico projeto atraves de ID

    async getProjectById(id: string): Promise<IProject> {

        const res = await fetch(`${BASE_URL}/${id}`);

        if (!res.ok) throw new Error("Erro! Projeto nao encontrado!");

        return res.json();

    },

    // Criar novo Projeto

    async createProject(project: IProject): Promise<IProject> {

        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!res.ok) throw new Error("Erro na criacao do Projeto!");

        return res.json();
    
    },

    // Editar um porjecto

    async updateProject(project: IProject): Promise<IProject> {

        const res = await fetch(`${BASE_URL}/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!res.ok) throw new Error("Erro ao editar o projeto!");

        return res.json();
    },

    // Excluir projetos

    async deleteProject(id: string): Promise<void> {

        const res = await fetch(`${BASE_URL}/${id}`,
            { method: "DELETE"});

        if (!res.ok) throw new Error("Erro ao excluir o projeto!");

    },
};

