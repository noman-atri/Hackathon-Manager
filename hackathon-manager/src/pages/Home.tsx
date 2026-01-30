import TeamsTable from "../components/TeamsTable";
import { Typography } from "@mui/material";
import { useTeams } from "../context/TeamsContext";

function Home() {
    const { teams } = useTeams();
    return (
        <>
            <Typography variant="h3">Registered Teams</Typography>
            <TeamsTable data={teams} />
        </>
    );
}

export default Home;