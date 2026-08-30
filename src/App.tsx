import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './components/Dashboard'
import ProjectPage from './components/ProjectPage'
import './App.css'



function App() {

  return (

    <div className="app">

      <header className="app-header">
        <h1>TechSolutions - Gestao de Projectos</h1>
      </header>

      <main className="app-main">

        <Routes>
          <Route path="/projects" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/projects" replace />} />
        </Routes>

      </main>

    </div>
    
  );

}

export default App
