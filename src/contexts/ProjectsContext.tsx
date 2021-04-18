import { useState } from "react";
import { useEffect } from "react";
import { createContext, ReactNode } from "react";
import api from "../services/api";

interface Project {
  name: string;
  description: string;
  viability: number;
  start_date: Date;
  end_date: Date;
  status: string;
  value: number;
  name_responsible: string;
}

interface ProjectContextData {
  projects: Project[];
}

interface ProjectsProviderProps {
  children: ReactNode;
}

interface ApiData {
    data : Project[];
}

export const ProjectsContext = createContext({} as ProjectContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const [ApiData, setApiData] = useState({} as ApiData);
  useEffect(() => {
    api.get("api/v1/projects").then((response) => {
      setApiData(response.data);
    });
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects: ApiData.data,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
