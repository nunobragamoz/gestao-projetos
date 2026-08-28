import { useState } from 'react'
import type { IProject, IProjectFormData } from './interfaces/IProject'
import Dashboard from './components/Dashboard'
import ProjectPage from './components/ProjectPage'
import './App.css'

/**
 * Dados iniciais (mock). Quando a API estiver ligada (npm run api),
 * estes dados passam a vir do db.json.
 */
const INITIAL_PROJECTS: IProject[] = [
  {
    id: "p1", name: "Redesign de Website", description: "Redesign completo da homepage",
    createdAt: "2026-08-01T10:00:00.000Z",
    tasks: [
      { id: "t1", title: "Criar mockups para cliente", description: "Design no Figma", dueDate: "2026-08-15", status: "concluída" },
      { id: "t2", title: "Desenvolver homepage", description: "TS + React", dueDate: "2026-08-25", status: "em progresso" },
      { id: "t3", title: "Testes unitários", description: "Vitest + Testing Library", dueDate: "2026-09-01", status: "pendente" },
    ],
  },
  {
    id: "p2", name: "Aplicativo para Android", description: "Aplicação mobile para clientes",
    createdAt: "2026-08-10T10:00:00.000Z",
    tasks: [
      { id: "t4", title: "Instalar React Native", description: "Configurar ambiente", dueDate: "2026-08-20", status: "pendente" },
    ],
  },
]

function App() {

  const [projects, setProjects] = useState<IProject[]>(INITIAL_PROJECTS)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // O projecto seleccionado é derivado do estado, nunca copiado.
  const selectedProject = projects.find(p => p.id === selectedId) ?? null

  const handleCreateProject = (data: IProjectFormData) => {

    const newProject: IProject = {
      id: `p${Date.now()}`,
      name: data.name,
      description: data.description,
      createdAt: new Date().toISOString(),
      tasks: [],
    }

    setProjects(prev => [...prev, newProject])

  }

  const handleDeleteProject = (id: string) => {

    setProjects(prev => prev.filter(p => p.id !== id))
    if (selectedId === id) setSelectedId(null)

  }

  // Recebe o projecto já alterado pela ProjectPage e substitui-o na lista.
  const handleUpdateProject = (updated: IProject) => {

    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p))

  }

  return (

    <div className="app">

      <header className="app-header">
        <h1>Gestão de Projectos</h1>
      </header>

      <main>

        {selectedProject ? (
          <ProjectPage
            project={selectedProject}
            onBack={() => setSelectedId(null)}
            onChange={handleUpdateProject}
          />
        ) : (
          <Dashboard
            projects={projects}
            onCreate={handleCreateProject}
            onDelete={handleDeleteProject}
            onView={setSelectedId}
          />
        )}

      </main>

    </div>
  )
}

export default App
