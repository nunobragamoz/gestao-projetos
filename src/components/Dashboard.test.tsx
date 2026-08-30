import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import Dashboard from "./Dashboard";

// Mock da API — impede chamadas HTTP reais durante os testes
vi.mock("../services/api", () => ({
  api: {
    getProjects: vi.fn().mockResolvedValue([
      {
        id: "p1",
        name: "Projeto Teste",
        description: "Descrição do projeto teste",
        createdAt: "2026-01-01T00:00:00.000Z",
        tasks: [
          { id: "t1", title: "Tarefa 1", description: "Desc", dueDate: "2027-01-01", status: "pendente" },
        ],
      },
    ]),
    createProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
  },
}));

/** Helper — renderiza o componente com todos os providers necessários */
function renderDashboard() {
  return render(
    <ProjectProvider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </ProjectProvider>
  );
}

describe("Dashboard", () => {
  it("deve mostrar o título do dashboard", () => {
    renderDashboard();
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });

  it("deve mostrar o botão de novo projeto", () => {
    renderDashboard();
    expect(screen.getByText("+ Novo Projeto")).toBeInTheDocument();
  });

  it("deve carregar e mostrar projetos da API", async () => {
    renderDashboard();
    // findBy espera pela operação assíncrona
    const projectName = await screen.findByText("Projeto Teste");
    expect(projectName).toBeInTheDocument();
  });

  it("deve mostrar o progresso do projeto", async () => {
    renderDashboard();
    await screen.findByText("Projeto Teste");
    // 0 de 1 concluída = 0%
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});