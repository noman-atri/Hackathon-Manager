import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Select from "react-select";

import type { TeamStatus } from "../models/Team";
import { useState } from "react";
import { useTeams } from "../context/TeamsContext";
// import { useId } from "react";

interface FormFields {
  teamName: string;
  projectName: string;
  membersCount: number;
  track: string;
  status: TeamStatus;
}

interface TrackOption {
  value: string;
  label: string;
}

const TrackOptions: TrackOption[] = [
  { value: "AI/ML", label: "AI/ML" },
  { value: "Web", label: "Web" },
  { value: "Mobile", label: "Mobile" },
];

function CreateTeam() {
  const { teams, addTeam } = useTeams();

  const navigate = useNavigate();

  const [openToast, setOpenToast] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      status: "Not Started",
    },
  });

  const onSubmit = (data: FormFields) => {
    console.log("New Team:", data);

    addTeam({
      id: teams.length + 1 + "", //String(teams.length + 1),
      ...data,
    });

    // Reset form fields
    reset();

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
        Add Team
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {/* Team Name */}
          <TextField
            label="Team Name"
            {...register("teamName", { required: "Team name is required" })}
            error={!!errors.teamName}
            helperText={errors.teamName?.message}
          />

          {/* Project Name */}
          <TextField
            label="Project Name"
            {...register("projectName", {
              required: "Project name is required",
            })}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
          />

          {/* Members Count */}
          <TextField
            label="Members Count"
            type="number"
            {...register("membersCount", {
              required: "Members count is required",
              min: { value: 1, message: "Must be at least 1" },
            })}
            error={!!errors.membersCount}
            helperText={errors.membersCount?.message}
          />

          {/* Track (React-Select) */}
          <FormControl>
            <FormLabel>Track</FormLabel>
            <Controller
              name="track"
              control={control}
              rules={{ required: "Track is required" }}
              render={({ field }) => (
                <Select<TrackOption, false>
                  options={TrackOptions}
                  value={TrackOptions.find(
                    (option) => option.value === field.value,
                  )}
                  onChange={(option) => field.onChange(option?.value)}
                  placeholder="Select track"
                />
              )}
            />
            {errors.track && (
              <Typography color="error" variant="caption">
                {errors.track.message}
              </Typography>
            )}
          </FormControl>

          {/* Status */}
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} row>
                  <FormControlLabel
                    value="Not Started"
                    control={<Radio />}
                    label="Not Started"
                  />
                  <FormControlLabel
                    value="In-Progress"
                    control={<Radio />}
                    label="In-Progress"
                  />
                  <FormControlLabel
                    value="Completed"
                    control={<Radio />}
                    label="Completed"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          {/* Actions */}
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained">
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      </form>
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
