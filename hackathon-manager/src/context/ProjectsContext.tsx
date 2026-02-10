import { createContext, useContext, useState } from "react";
import type Project from "../models/Project";
import { projectsData } from "../data/Projects";

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined,
);

export const ProjectsProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(projectsData);

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)),
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within ProjectsProvider");
  }
  return context;
};
