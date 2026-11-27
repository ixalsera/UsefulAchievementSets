import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface CollapseContextValue {
  isCollapsed: (key: string) => boolean;
  toggle: (key: string) => void;
  allCollapsed: boolean;
  setAll: (collapsed: boolean) => void;
}

const CollapseContext = createContext<CollapseContextValue | null>(null);

interface CollapseProviderProps {
  keys: string[];
  children: ReactNode;
}

export function CollapseProvider({ keys, children }: CollapseProviderProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const value = useMemo<CollapseContextValue>(
    () => ({
      isCollapsed: (key) => collapsed[key] ?? false,
      toggle: (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] })),
      allCollapsed: keys.length > 0 && keys.every((k) => collapsed[k]),
      setAll: (value) => setCollapsed(Object.fromEntries(keys.map((k) => [k, value]))),
    }),
    [collapsed, keys],
  );

  return <CollapseContext.Provider value={value}>{children}</CollapseContext.Provider>;
}

export function useCollapse() {
  const ctx = useContext(CollapseContext);
  if (!ctx) throw new Error("useCollapse must be used inside <CollapseProvider>");
  return ctx;
}
