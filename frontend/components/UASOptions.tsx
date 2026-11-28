import { DialogButtonSecondary } from "millennium";

import { useCollapse } from "../context/CollapseContext";
import { SteamIcons } from "../util/icons";
import { SortOptions } from "../util/sortable";
import { Select } from "./ui/Select";

interface SortAndFilterProps {
  sortBy: SortOptions;
  onSortSelected: (sortOrder: SortOptions) => void;
  sortOrder: boolean;
  onToggleSortOrder: () => void;
  clearCache: any;
}

export function UASOptions({
  sortBy,
  onSortSelected,
  sortOrder,
  onToggleSortOrder,
  clearCache,
}: SortAndFilterProps) {
  const { allCollapsed, setAll } = useCollapse();

  const sortingOptions = [
    { data: SortOptions.Default, label: "Default" },
    { data: SortOptions.UnlockDate, label: "Unlock Date" },
    { data: SortOptions.Name, label: "Name" },
    { data: SortOptions.Points, label: "Points" },
    { data: SortOptions.RarityHunters, label: "Rarity (SH)" },
    { data: SortOptions.RaritySteam, label: "Rarity (Steam)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.5rem",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Select options={sortingOptions} value={sortBy} onChange={onSortSelected} />
        <div
          style={{
            display: "inline-flex",
            cursor: "pointer",
            transition: "transform 150ms ease",
            transform: sortOrder ? "rotate(180deg)" : undefined,
          }}
        >
          <SteamIcons.SortDescending width="1em" height="1em" onClick={onToggleSortOrder} />
        </div>
      </div>
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
