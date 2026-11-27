import { DialogButtonSecondary } from "millennium";

import { useCollapse } from "../context/CollapseContext";
import { SteamIcons } from "../util/icons";
import { SortOptions } from "../util/sortable";
import { Select } from "./ui/Select";

interface SortAndFilterProps {
  sortBy: SortOptions;
  onSortSelected: (sortOrder: SortOptions) => void;
  clearCache: any;
}

export function UASOptions({ sortBy, onSortSelected, clearCache }: SortAndFilterProps) {
  const { allCollapsed, setAll } = useCollapse();

  const sortingOptions = [
    { data: SortOptions.Default, label: "Default" },
    { data: SortOptions.UnlockDate, label: "Unlock Date" },
    { data: SortOptions.Name, label: "Name" },
    { data: SortOptions.Points, label: "Points" },
    { data: SortOptions.RarityHunters, label: "Rarity (SH)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
      <Select options={sortingOptions} value={sortBy} onChange={onSortSelected} />
      <SteamIcons.SortDescending width="1em" height="1em" />
      <DialogButtonSecondary onClick={clearCache}>Clear Cache</DialogButtonSecondary>
      <div
        style={{
          display: "inline-flex",
          cursor: "pointer",
          transition: "transform 150ms ease",
          transform: allCollapsed ? "rotate(90deg)" : undefined,
        }}
        onClick={() => setAll(!allCollapsed)}
      >
        <SteamIcons.DoubleChevron width="2em" height="2em" />
      </div>
    </div>
  );
}
