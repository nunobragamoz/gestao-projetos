import { useReducer, ReactNode } from "react";
import { ProjectContext, projectReducer, initialState } from "./projectStore";

// Provider para disponibilizar o contexto do Projeto aos componentes

export function ProjectProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(projectReducer, initialState);

    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );

}