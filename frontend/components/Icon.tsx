import { useEffect, useState } from "react";

export function Icon() {
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    console.log("Getting icon...");
    backend.getSteamBrewIconResource().then(setIcon);
  }, []);

  return (
    <div
      className="SteamClientHomebrewIcon"
      style={{
        width: "16px",
        height: "16px",
        marginRight: "5px",
      }}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}
