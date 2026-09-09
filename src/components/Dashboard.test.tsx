import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProjectProvider } from "../context/ProjectContext";
import Dashboard from "./Dashboard";
import { api } from "../services/api";

// Mock da API — impede chamadas HTTP reais durante os testes

vi.mock("../services/api", () => ({
  api: {
    getProjects: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn(),
    deleteProject: vi.fn(),
  },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const mockProjects = [
  {
    id: "p1",
    name: "Projeto Teste",
    description: "Descrição do projeto teste",
    createdAt: "2026-01-01T00:00:00.000Z",
    tasks: [
      { id: "t1", title: "Tarefa 1", description: "Desc", dueDate: "2027-01-01", status: "pendente" as const },
    ],
  },
];

function renderDashboard() {
  vi.mocked(api.getProjects).mockResolvedValue(mockProjects);

  return render(
    <ProjectProvider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </ProjectProvider>
  );
}

/** Helper — renderiza o componente com todos os providers necessários */

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

  it("deve criar um projeto e mostrá-lo na lista", async () => {
    vi.mocked(api.createProject).mockResolvedValue({
      id: "p2",
      name: "Projeto Novo",
      description: "Descrição do projeto novo",
      createdAt: "2026-02-01T00:00:00.000Z",
      tasks: [],
    });

    renderDashboard();
    await screen.findByText("Projeto Teste");

    fireEvent.click(screen.getByRole("button", { name: /novo projeto/i }));
    fireEvent.change(screen.getByLabelText(/nome do projeto/i), {
      target: { value: "Projeto Novo" },
    });
    fireEvent.change(screen.getByLabelText(/descrição/i), {
      target: { value: "Descrição do projeto novo" },
    });
    fireEvent.click(screen.getByRole("button", { name: /criar projeto/i }));

    await waitFor(() => {
      expect(api.createProject).toHaveBeenCalledTimes(1);
    });
    expect(await screen.findByText("Projeto Novo")).toBeInTheDocument();
  });

  it("deve excluir um projeto quando o utilizador confirma", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.mocked(api.deleteProject).mockResolvedValue(undefined);

    renderDashboard();
    await screen.findByText("Projeto Teste");

    fireEvent.click(screen.getByTitle("Excluir"));

    await waitFor(() => {
      expect(api.deleteProject).toHaveBeenCalledWith("p1");
    });
  });

  it("não deve excluir quando o utilizador cancela a confirmação", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);

    renderDashboard();
    await screen.findByText("Projeto Teste");

    fireEvent.click(screen.getByTitle("Excluir"));

    expect(api.deleteProject).not.toHaveBeenCalled();
  });

  it("deve mostrar banner de erro quando a API falha", async () => {
    renderDashboard();
    vi.mocked(api.getProjects).mockRejectedValue(new Error("Falha a carregar API"));
    cleanup();

    render(
      <ProjectProvider>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ProjectProvider>
    );

    expect(await screen.findByText(/Falha a carregar API/i)).toBeInTheDocument();
  });

});