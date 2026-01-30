import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {
  TextField,
  Button,
  Box,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import type { TeamStatus } from "../models/Team";

export interface TeamFormValues {
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

const trackOptions: TrackOption[] = [
  { value: "AI", label: "AI" },
  { value: "Web", label: "Web" },
  { value: "Mobile", label: "Mobile" },
];

interface TeamFormProps {
  defaultValues?: TeamFormValues;
  onSubmit: (data: TeamFormValues) => void;
  submitLabel: string;
}

const TeamForm: React.FC<TeamFormProps> = ({
  defaultValues,
  onSubmit,
  submitLabel,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TeamFormValues>({
    defaultValues: defaultValues ?? {
      status: "Not Started",
    },
  });

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            label="Team Name"
            {...register("teamName", { required: "Team name is required" })}
            error={!!errors.teamName}
            helperText={errors.teamName?.message}
          />

          <TextField
            label="Project Name"
            {...register("projectName", {
              required: "Project name is required",
            })}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
          />

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

          {/* Track */}
          <FormControl>
            <FormLabel>Track</FormLabel>
            <Controller
              name="track"
              control={control}
              rules={{ required: "Track is required" }}
              render={({ field }) => (
                <Select<TrackOption, false>
                  options={trackOptions}
                  value={trackOptions.find((opt) => opt.value === field.value)}
                  onChange={(opt) => field.onChange(opt?.value)}
                />
              )}
            />
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

          <Button type="submit" variant="contained">
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TeamForm;
