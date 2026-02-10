import { Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import ProjectsTable from "../components/ProjectsTable";
import { useProjects } from "../context/ProjectsContext";
import { useTeams } from "../context/TeamsContext";

const Projects: React.FC = () => {
  const { projects } = useProjects();
  const { teams } = useTeams();

  return (
    <>
      {/* 🔹 Page Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">Projects</Typography>

        <Button component={Link} to="/projects/create" variant="contained">
          Add Project
        </Button>
      </Stack>

      {/* 🔹 Table Content */}
      <ProjectsTable projects={projects} teams={teams} />
    </>
  );
};

export default Projects;
