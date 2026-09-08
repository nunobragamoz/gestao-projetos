import { createContext } from "react";
import { IProject } from "../interfaces/IProject";
import { ProjectAction } from "../types/types";

export interface ProjectState {
    projects: IProject[];
    loading: boolean;
    error: string | null;
}

export const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};

export function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {

  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload, loading: false };

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
        projects: state.projects.filter(p => p.id !== action.payload),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }

}

/* Contexto disponibilizado aos componentes */

export interface ProjectContextType {
    state: ProjectState;
    dispatch: React.Dispatch<ProjectAction>;
}

/* Contexto do objecto em si -para hook useProjectContext */ 
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);