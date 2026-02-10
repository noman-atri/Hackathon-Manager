import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Paper,
} from "@mui/material";

import type Team  from "../models/Team";
import type { TeamStatus } from "../models/Team";
// import type Project from "../models/Project";

export interface ProjectFormValues {
  name: string;
  description: string;
  teamId: string;
  status: TeamStatus;
}

interface TeamOption {
  value: string;
  label: string;
}

interface ProjectFormProps {
  teams: Team[];
  defaultValues?: ProjectFormValues;
  submitLabel: string;
  onSubmit: (data: ProjectFormValues) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  teams,
  defaultValues,
  submitLabel,
  onSubmit,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    defaultValues: defaultValues ?? {
      status: "Not Started",
    },
  });

  const teamOptions: TeamOption[] = teams.map((team) => ({
    value: team.id,
    label: team.teamName,
  }));

  return (
    <Paper sx={{ p: 4, maxWidth: 600 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Typography variant="h6">Project Details</Typography>

          {/* Project Name */}
          <TextField
            label="Project Name"
            {...register("name", {
              required: "Project name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Description */}
          <TextField
            label="Description"
            multiline
            minRows={3}
            {...register("description", {
              required: "Description is required",
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          {/* Team Select */}
          <FormControl error={!!errors.teamId}>
            <FormLabel required>Team</FormLabel>

            <Controller
              name="teamId"
              control={control}
              rules={{
                required: "Team is required",
              }}
              render={({ field }) => (
                <Select<TeamOption, false>
                  inputId="project-team-select"
                  options={teamOptions}
                  value={teamOptions.find((opt) => opt.value === field.value)}
                  onChange={(opt) => field.onChange(opt?.value)}
                  placeholder="Select team"
                />
              )}
            />

            {errors.teamId && (
              <Typography variant="caption" color="error">
                {errors.teamId.message}
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

          <Button type="submit" variant="contained">
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default ProjectForm;
