import {
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

import { useState } from "react";
import { useTeams } from "../context/TeamsContext";
import type { TeamStatus } from "../models/Team";
import TeamForm from "../components/TeamForm";

interface FormFields {
  teamName: string;
  projectName: string;
  membersCount: number;
  track: string;
  status: TeamStatus;
}

function CreateTeam() {
  const { teams, addTeam } = useTeams();
  const [openToast, setOpenToast] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const onSubmit = (data: FormFields) => {
    console.log("New Team:", data);

    addTeam({
      id: teams.length + 1 + "", //String(teams.length + 1),
      ...data,
    });

    // resetFields(data);
    // 🔁 Force form reset
    setFormKey((prev) => prev + 1);

    // Show success toast
    setOpenToast(true);

    // later: add to global state
    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
  };

  return (
    <Box maxWidth={600}>
      <Typography variant="h5" gutterBottom>
        Register Team
      </Typography>

      <TeamForm key={formKey} onSubmit={onSubmit} submitLabel="Register" />

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
          Team added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateTeam;
