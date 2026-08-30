import { describe, it, expect } from "vitest";
import { Project, ProjectValidator } from "./Project";
import { Task } from "./Task";
import { IProject } from "../interfaces/IProject";

describe("Project class", () => {
  const projectData: IProject = {
    id: "p1", name: "Test Project", description: "A test project description",
    createdAt: "2026-01-01T00:00:00.000Z",
    tasks: [
      { id: "t1", title: "Task 1", description: "Desc 1", dueDate: "2027-01-01", status: "concluída" },
      { id: "t2", title: "Task 2", description: "Desc 2", dueDate: "2027-01-01", status: "pendente" },
    ],
  };

  it("deve criar com composição de tarefas", () => {
    const project = new Project(projectData);
    expect(project.name).toBe("Test Project");
    expect(project.tasks).toHaveLength(2);
    // Verifica que as tarefas são instâncias da classe Task (composição)
    expect(project.tasks[0]).toBeInstanceOf(Task);
  });

  it("deve calcular progresso corretamente (1 de 2 = 50%)", () => {
    expect(new Project(projectData).getProgress()).toBe(50);
  });

  it("deve retornar 0% quando não há tarefas", () => {
    expect(new Project({ ...projectData, tasks: [] }).getProgress()).toBe(0);
  });

  it("deve contar tarefas por status", () => {
    const counts = new Project(projectData).getTaskCountByStatus();
    expect(counts["concluída"]).toBe(1);
    expect(counts["pendente"]).toBe(1);
    expect(counts["em progresso"]).toBe(0);
  });

  it("deve adicionar tarefa", () => {
    const project = new Project({ ...projectData, tasks: [] });
    const task = Task.fromFormData({
      title: "Nova", description: "Descrição", dueDate: "2027-06-01", status: "pendente",
    });
    project.addTask(task);
    expect(project.tasks).toHaveLength(1);
  });

  it("deve remover tarefa pelo ID", () => {
    const project = new Project(projectData);
    project.removeTask("t1");
    expect(project.tasks).toHaveLength(1);
    expect(project.tasks[0].id).toBe("t2");
  });

  it("deve atualizar tarefa existente", () => {
    const project = new Project(projectData);
    project.updateTask("t2", {
      id: "t2", title: "Atualizada", description: "Nova desc", dueDate: "2027-05-01", status: "em progresso",
    });
    expect(project.tasks[1].title).toBe("Atualizada");
    expect(project.tasks[1].status).toBe("em progresso");
  });

  it("deve serializar para JSON com tarefas", () => {
    const json = new Project(projectData).toJSON();
    expect(json.name).toBe("Test Project");
    expect(json.tasks).toHaveLength(2);
  });

  it("deve criar via factory method sem tarefas", () => {
    const project = Project.fromFormData({ name: "Novo", description: "Descrição do novo projeto" });
    expect(project.name).toBe("Novo");
    expect(project.tasks).toHaveLength(0);
    expect(project.id).toBeDefined();
  });
});

describe("ProjectValidator", () => {
  const validator = new ProjectValidator();

  it("deve validar dados corretos", () => {
    const r = validator.validate({ name: "Projeto Válido", description: "Descrição com mais de 10 caracteres" });
    expect(r.isValid).toBe(true);
  });

  it("deve rejeitar nome com menos de 3 caracteres", () => {
    const r = validator.validate({ name: "ab", description: "Descrição válida aqui" });
    expect(r.isValid).toBe(false);
    expect(r.errors.name).toBeDefined();
  });

  it("deve rejeitar descrição com menos de 10 caracteres", () => {
    const r = validator.validate({ name: "Projeto OK", description: "Curta" });
    expect(r.isValid).toBe(false);
    expect(r.errors.description).toBeDefined();
  });
});