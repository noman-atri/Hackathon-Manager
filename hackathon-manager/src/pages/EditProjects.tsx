import { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import ProjectForm from "../components/ProjectsForm";
import type { ProjectFormValues } from "../components/ProjectsForm";
import { useProjects } from "../context/ProjectsContext";
import { useTeams } from "../context/TeamsContext";

const EditProject: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const { projects, updateProject, deleteProject } = useProjects();
  const { teams } = useTeams();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <Typography>Project not found</Typography>;
  }

  const handleUpdate = (data: ProjectFormValues) => {
    updateProject({
      id: project.id,
      ...data,
    });

    navigate("/projects");
  };

  const handleDelete = () => {
    deleteProject(project.id);
    navigate("/projects");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Edit Project
      </Typography>

      <ProjectForm
        teams={teams}
        submitLabel="Update Project"
        defaultValues={{
          name: project.name,
          description: project.description,
          teamId: project.teamId,
          status: project.status,
        }}
        onSubmit={handleUpdate}
      />

      {/* Delete Actions */}
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          color="error"
          variant="outlined"
          onClick={() => setOpenDeleteDialog(true)}
        >
          Delete Project
        </Button>

        <Button variant="outlined" onClick={() => navigate("/projects")}>
          Cancel
        </Button>
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Project</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>

          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditProject;