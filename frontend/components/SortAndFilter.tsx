import { SteamIcons } from "../util/icons";
import { SortOptions } from "../util/sortable";
import { Select } from "./ui/Select";

interface SortAndFilterProps {
  sortBy: SortOptions;
  onSortSelected: (sortOrder: SortOptions) => void;
}

export function SortAndFilter({ sortBy, onSortSelected }: SortAndFilterProps) {
  const sortingOptions = [
    { data: SortOptions.Default, label: "Default" },
    { data: SortOptions.UnlockDate, label: "Unlock Date" },
    { data: SortOptions.Name, label: "Name" },
    { data: SortOptions.Points, label: "Points" },
    { data: SortOptions.RarityHunters, label: "Rarity (SH)" },
  ];
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}>
        <Select options={sortingOptions} value={sortBy} onChange={onSortSelected} />
        <SteamIcons.SortDescending width="1em" height="1em" />
      </div>
    </div>
  );
}
