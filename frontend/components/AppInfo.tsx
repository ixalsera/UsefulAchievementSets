import { AppDetails } from "../interfaces/Apps";

interface AppDetailsProps {
  details: AppDetails | null;
}

export function AppInfo({ details }: AppDetailsProps) {
  return (
    <div>
      <p>Name: {details?.name}</p>
      <p>Achievements: {details?.achievementCount}</p>
      <p>Points: {details?.points}</p>
      <p>Released: {details?.releaseDate}</p>
    </div>
  );
}
