import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";

import TeamForm from "../components/TeamForm";
import type { TeamFormValues } from "../components/TeamForm";
import { useTeams } from "../context/TeamsContext";

const EditTeam: React.FC = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const { teams, updateTeam, deleteTeam } = useTeams();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const team = teams.find((t) => t.id === teamId);

  // Guard: invalid URL or deleted team
  if (!team) {
    return <Typography>Team not found</Typography>;
  }

  const handleUpdate = (data: TeamFormValues) => {
    updateTeam({
      id: team.id,
      ...data,
    });

    setOpenToast(true);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleDelete = () => {
    deleteTeam(team.id);
    navigate("/");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Edit Team
      </Typography>

      <TeamForm
        defaultValues={{
          teamName: team.teamName,
          projectName: team.projectName,
          membersCount: team.membersCount,
          track: team.track,
          status: team.status,
        }}
        onSubmit={handleUpdate}
        submitLabel="Update"
      />

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          color="error"
          variant="outlined"
          onClick={() => setOpenDeleteDialog(true)}
        >
          Delete Team
        </Button>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </Stack>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Delete Team</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this team?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Toast */}
      <Snackbar
        open={openToast}
        autoHideDuration={2000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Team updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditTeam;
