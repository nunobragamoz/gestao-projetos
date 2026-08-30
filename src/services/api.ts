import type { IProject } from "../interfaces/IProject";

const BASE_URL = "http://localhost:3001/projects";

// Servico de API REST

export const api = {

    //obter projectos
    
    async getProjects(): Promise<IProject[]> {

        const res = await fetch(BASE_URL);

        if (!res.ok) throw new Error("Erro! Falha no carregamento dos Projectos!");

        return res.json();
    },

    // obter um unico projecto atraves de ID

    async getProjectById(id: string): Promise<IProject> {

        const res = await fetch(`${BASE_URL}/${id}`);

        if (!res.ok) throw new Error("Erro! Projecto nao encontrado!");

        return res.json();

    },

    // Criar novo Projecto

    async createProject(project: IProject): Promise<IProject> {

        const res = await fetch(BASE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!res.ok) throw new Error("Erro na criacao do Projecto!");

        return res.json();
    
    },

    // Editar um porjecto

    async updateProject(project: IProject): Promise<IProject> {

        const res = await fetch(`${BASE_URL}/${project.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(project),
        });

        if (!res.ok) throw new Error("Erro ao editar o projecto!");

        return res.json();
    },

    // Excluir projectos

    async deleteProject(id: string): Promise<void> {

        const res = await fetch(`${BASE_URL}/${id}`,
            { method: "DELETE"});

        if (!res.ok) throw new Error("Erro ao excluir o projecto!");

    },
};

