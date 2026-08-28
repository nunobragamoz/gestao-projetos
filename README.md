TechSolutions — Gestão de Projetos

Aplicação web de gestão de projetos e tarefas desenvolvida com React e TypeScript.

 Framework Escolhido: React | Ferramenta Front-end: Vite

A escolha baseia-se na flexibilidade dos componentes funcionais com Hooks, na simplicidade da Context API para gestão de estado, e na utilização de Custom Hooks e HOC como padrões avançados de reutilização de lógica —
equivalentes aos Decorators e Services do Angular.

 Como Executar

```bash
# Instalar dependências
npm install

# Iniciar a API simulada (terminal 1)
npm run api

# Iniciar a aplicação (terminal 2)
npm run dev

# Executar testes
npm test
```

 Arquitetura

- models/ — Classes TypeScript (Task, Project) com herança e composição
- interfaces/ — Contratos (ITask, IProject, IValidator)
- types/ — Tipos avançados (union, mapped, conditional)
- services/ — Camada de acesso à API REST
- context/ — Gestão de estado global (Context API + useReducer)
- hooks/ — Custom Hooks reutilizáveis (useProjects, useTasks, useValidation)
- hoc/ — Higher-Order Components (withLoading)
- compoents/ — Componentes React funcionais