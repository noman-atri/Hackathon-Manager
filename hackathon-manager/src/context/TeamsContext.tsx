import { createContext, useContext, useState } from "react";
import Team from "../models/Team";
import { teamsData } from "../data/Teams";

interface TeamsContextType {
  teams: Team[];
  addTeam: (team: Team) => void;
  updateTeam: (updatedTeam: Team) => void;
  deleteTeam: (teamId: string) => void;
}

const TeamsContext = createContext<TeamsContextType | undefined>(undefined);

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [teams, setTeams] = useState<Team[]>(teamsData);

  const addTeam = (team: Team) => {
    setTeams((prev) => [...prev, team]);
  };

  const updateTeam = (updatedTeam: Team) => {
    setTeams((prev) =>
      prev.map((team) => (team.id === updatedTeam.id ? updatedTeam : team)),
    );
  };

  const deleteTeam = (teamId: string) => {
    setTeams((prev) => prev.filter((team) => team.id !== teamId));
  };

  return (
    <TeamsContext.Provider value={{ teams, addTeam, updateTeam, deleteTeam }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = (): TeamsContextType => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeams must be used within a TeamsProvider");
  }
  return context;
};