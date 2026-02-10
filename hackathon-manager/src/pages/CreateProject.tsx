import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProjectForm from "../components/ProjectsForm";
import type { ProjectFormValues } from "../components/ProjectsForm";
import { useProjects } from "../context/ProjectsContext";
import { useTeams } from "../context/TeamsContext";

const AddProject: React.FC = () => {
  const { addProject, projects } = useProjects();
  const { teams } = useTeams();
  const navigate = useNavigate();

  const handleCreate = (data: ProjectFormValues) => {
    addProject({
      id: "p" + (projects.length + 1) + "",
      ...data,
    });

    navigate("/projects");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Add Project
      </Typography>

      <ProjectForm
        teams={teams}
        submitLabel="Create Project"
        onSubmit={handleCreate}
      />
    </>
  );
};

export default AddProject;
