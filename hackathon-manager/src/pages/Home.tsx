import TeamsTable from "../components/TeamsTable";
import { Typography } from "@mui/material";
import { useTeams } from "../context/TeamsContext";
// import { useProjects } from "../context/ProjectsContext";

function Home() {
    const { teams } = useTeams();
    // const { projects } = useProjects();
    // console.log(projects);
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Registered Teams
        </Typography>
        <TeamsTable data={teams} />
      </>
    );
}

export default Home;