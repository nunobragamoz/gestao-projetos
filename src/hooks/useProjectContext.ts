import { useContext } from "react";
import { ProjectContext, ProjectContextType } from "../context/projectStore";

// Hook para encapsular o contexto do Projeto

export function useProjectContext(): ProjectContextType {

    const context = useContext(ProjectContext);

    if (!context) {
        throw new Error("useProjectContext so pode ser usado dentro de um ProjectProvider");
    }

    return context;

}