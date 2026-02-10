import type { TeamStatus } from "./Team";

export default class Project {
  id: string;
  name: string;
  description: string;
  teamId: string; // foreign key → Team.id
  status: TeamStatus;

  constructor(
    id: string,
    name: string,
    description: string,
    teamId: string,
    status: TeamStatus
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.teamId = teamId;
    this.status = status;
  }
}