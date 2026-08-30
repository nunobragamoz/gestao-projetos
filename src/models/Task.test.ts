import { describe, it, expect } from "vitest";
import { Task, TaskValidator } from "./Task";
import { ITask } from "../interfaces/ITask";

describe("Task class", () => {
  const taskData: ITask = {
    id: "t1", title: "Test Task", description: "A test task",
    dueDate: "2027-01-01", status: "pendente",
  };

  it("deve criar instância com os dados corretos", () => {
    const task = new Task(taskData);
    expect(task.title).toBe("Test Task");
    expect(task.status).toBe("pendente");
    expect(task.id).toBe("t1");
  });

  it("deve marcar como concluída", () => {
    const task = new Task(taskData);
    task.markAsCompleted();
    expect(task.status).toBe("concluída");
  });

  it("deve detetar tarefa atrasada", () => {
    const overdue = new Task({ ...taskData, dueDate: "2020-01-01" });
    expect(overdue.isOverdue()).toBe(true);
  });

  it("tarefa concluída nunca está atrasada", () => {
    const done = new Task({ ...taskData, dueDate: "2020-01-01", status: "concluída" });
    expect(done.isOverdue()).toBe(false);
  });

  it("deve serializar para JSON", () => {
    const task = new Task(taskData);
    expect(task.toJSON()).toEqual(taskData);
  });

  it("deve criar via factory method com UUID gerado", () => {
    const task = Task.fromFormData({
      title: "Nova", description: "Descrição", dueDate: "2027-06-01", status: "pendente",
    });
    expect(task.title).toBe("Nova");
    expect(task.id).toBeDefined();
    expect(task.id.length).toBeGreaterThan(0);
  });
});

describe("TaskValidator", () => {
  const validator = new TaskValidator();

  it("deve validar dados corretos", () => {
    const r = validator.validate({
      title: "Tarefa válida", description: "Descrição OK", dueDate: "2027-01-01", status: "pendente",
    });
    expect(r.isValid).toBe(true);
    expect(Object.keys(r.errors)).toHaveLength(0);
  });

  it("deve rejeitar título com menos de 3 caracteres", () => {
    const r = validator.validate({
      title: "ab", description: "Descrição OK", dueDate: "2027-01-01", status: "pendente",
    });
    expect(r.isValid).toBe(false);
    expect(r.errors.title).toBeDefined();
  });

  it("deve rejeitar descrição curta", () => {
    const r = validator.validate({
      title: "Tarefa OK", description: "abc", dueDate: "2027-01-01", status: "pendente",
    });
    expect(r.isValid).toBe(false);
    expect(r.errors.description).toBeDefined();
  });

  it("deve rejeitar data vazia", () => {
    const r = validator.validate({
      title: "Tarefa OK", description: "Descrição OK", dueDate: "", status: "pendente",
    });
    expect(r.isValid).toBe(false);
    expect(r.errors.dueDate).toBeDefined();
  });
});