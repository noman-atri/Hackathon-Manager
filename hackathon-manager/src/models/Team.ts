export type TeamStatus = "Not Started" | "In-Progress" | "Completed";

export default class Team {
  id: string;
  teamName: string;
  projectName: string;
  membersCount: number;
  track: string;
  status: TeamStatus;

  constructor(
    id: string,
    teamName: string,
    projectName: string,
    membersCount: number,
    track: string,
    status: TeamStatus
  ) {
    this.id = id;
    this.teamName = teamName;
    this.projectName = projectName;
    this.membersCount = membersCount;
    this.track = track;
    this.status = status;
  }
}