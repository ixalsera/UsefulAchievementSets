interface SteamHuntersViewProps {
  appid: number;
}

export const SteamHuntersView = ({appid}: SteamHuntersViewProps) => {
  return (
    <div data-appid={appid}>UAS</div>
  )
}