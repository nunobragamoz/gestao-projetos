import { createContext, useContext, useReducer, ReactNode } from "react";
import { IProject } from "../interfaces/IProject";
import { ProjectAction } from "../types/types";

// State de Projectos

interface ProjectState {
    projects: IProject[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};

// Reducer 
// Nao muda directamente (spread) e o union type ProjctAction garante type safety

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {

    switch (action.type) {

        case "SET_PROJECTS":

            return { ...state, projects: action.payload, loading: false};

        case "ADD_PROJECT":

            return { ...state, projects: [...state.projects, action.payload] };
        
        case "UPDATE_PROJECT":

            return {
                ...state,
                projects: state.projects.map(p =>
                    p.id === action.payload.id ? action.payload : p
                ),
            };

        case "DELETE_PROJECT":

            return {
                ...state,
                projects:state.projects.filter(p => p.id !== action.payload),
            };

        case "SET_LOADING":

            return { ...state, loading: action.payload };

        case "SET_ERROR":

            return { ...state, error: action.payload, loading: false };

        default:

            return state;
    }

}

// Context para componentes

interface ProjectContextType {

    state: ProjectState;
    dispatch: React.Dispatch<ProjectAction>;

}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Provider que entrega o global state

export function ProjectProvider({ children }: { children: ReactNode }) {

    const [state, dispatch] = useReducer(projectReducer, initialState);

    return (

        <ProjectContext.Provider value={{ state, dispatch }}>
            
            {children}

        </ProjectContext.Provider>
    );
}

// Hook que da acesso ao context - usado fora da erro

export function useProjectContext(): ProjectContextType {
   
    const context = useContext(ProjectContext);
    
    if (!context) {

        throw new Error("Erro! Use useProjectContext dentro de ProjectProvider.")
    }

    return context;
}