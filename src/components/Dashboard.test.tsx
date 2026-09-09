import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
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

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});



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

  it("deve mostrar o título do dashboard", async () => {
    renderDashboard();
    // Espera pelo carregamento assíncrono antes de assertar — evita o aviso act()
    await screen.findByText("Projeto Teste");
    expect(screen.getByText(/Dashboard/)).toBeInTheDocument();
  });

  it("deve mostrar o botão de novo projeto", async () => {
    renderDashboard();
    await screen.findByText("Projeto Teste");
    // getByRole com regex — resiste a mudanças de grafia e maiúsculas
    expect(screen.getByRole("button", { name: /novo projeto/i })).toBeInTheDocument();
  });

  it("deve carregar e mostrar projetos da API", async () => {
    renderDashboard();
    expect(await screen.findByText("Projeto Teste")).toBeInTheDocument();
  });

  it("deve mostrar a descrição do projeto", async () => {
    renderDashboard();
    await screen.findByText("Projeto Teste");
    expect(screen.getByText("Descrição do projeto teste")).toBeInTheDocument();
  });

  it("deve mostrar o progresso do projeto", async () => {
    renderDashboard();
    await screen.findByText("Projeto Teste");
    // 0 de 1 tarefa concluída = 0%
    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("deve mostrar os badges de contagem de tarefas", async () => {
    renderDashboard();
    await screen.findByText("Projeto Teste");
    expect(screen.getByText("1 pendentes")).toBeInTheDocument();
    expect(screen.getByText("0 em progresso")).toBeInTheDocument();
    expect(screen.getByText("0 concluídas")).toBeInTheDocument();
  });
});