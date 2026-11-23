import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { SteamIcons } from "../../util/icons";

export interface SelectOption<T> {
  label: string;
  data: T;
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  /** The `data` of the selected option, compared with `Object.is`. */
  value: T;
  onChange: (value: T) => void;
}

/**
 * A good-enough clone of the new SteamUI select component as used in the new
 * Achievements view.
 *
 * The list is rendered as a popover so it sits in the top layer and is not
 * clipped by scroll containers or caught by ancestor transforms.
 */
export function Select<T>({ options, value, onChange }: SelectProps<T>) {
  const [expanded, setExpanded] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const boxRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const selectedIndex = options.findIndex((o) => Object.is(o.data, value));
  const selected = options[selectedIndex];

  const open = () => {
    setHighlighted(Math.max(selectedIndex, 0));
    setExpanded(true);
  };
  const close = () => setExpanded(false);
  const choose = (index: number) => {
    const option = options[index];
    if (option) onChange(option.data);
    close();
    boxRef.current?.focus();
  };

  // Show the popover and place it under the box (or above, if there is no room).
  useLayoutEffect(() => {
    const box = boxRef.current;
    const list = listRef.current;
    if (!expanded || !box || !list) return;

    list.showPopover();

    const win = box.ownerDocument.defaultView ?? window;
    const rect = box.getBoundingClientRect();
    const height = list.offsetHeight;
    const fitsBelow = rect.bottom + height <= win.innerHeight;

    list.style.left = `${rect.left}px`;
    list.style.top = `${fitsBelow ? rect.bottom : Math.max(rect.top - height, 0)}px`;
    list.style.minWidth = `${rect.width}px`;
  }, [expanded]);

  // Close on outside click, outer scroll, and resize.
  useEffect(() => {
    const box = boxRef.current;
    if (!expanded || !box) return;

    // Plugin code runs in SharedJSContext, so the global `document`/`window`
    // are not the Steam window this component is rendered into.
    const doc = box.ownerDocument;
    const win = doc.defaultView ?? window;
    const isInside = (target: EventTarget | null) =>
      target instanceof win.Node &&
      (boxRef.current?.contains(target) || listRef.current?.contains(target));

    const onPointerDown = (e: PointerEvent) => {
      if (!isInside(e.target)) close();
    };
    const onScroll = (e: Event) => {
      if (!listRef.current?.contains(e.target as Node)) close();
    };

    doc.addEventListener("pointerdown", onPointerDown, true);
    doc.addEventListener("scroll", onScroll, true);
    win.addEventListener("resize", close);
    return () => {
      doc.removeEventListener("pointerdown", onPointerDown, true);
      doc.removeEventListener("scroll", onScroll, true);
      win.removeEventListener("resize", close);
    };
  }, [expanded]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (!expanded) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        open();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlighted((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlighted((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setHighlighted(0);
        break;
      case "End":
        e.preventDefault();
        setHighlighted(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(highlighted);
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        close();
        break;
    }
  };

  return (
    <div className="selectContainer" style={{ position: "relative" }}>
      <div
        ref={boxRef}
        className="selectBox"
        role="combobox"
        tabIndex={0}
        aria-expanded={expanded}
        aria-haspopup="listbox"
        aria-controls={`${id}-list`}
        aria-activedescendant={expanded && highlighted >= 0 ? `${id}-${highlighted}` : undefined}
        onClick={() => (expanded ? close() : open())}
        onKeyDown={onKeyDown}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          boxSizing: "border-box",
          padding: "0.375rem 0.75rem",
          borderRadius: "4px",
          color: "var(--color-dull-12, #fff)",
          background: "var(--color-dull-4, #2a2e36)",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <span>{selected?.label ?? ""}</span>
        <SteamIcons.Chevron direction={expanded ? "up" : "down"} width="0.75rem" height="0.75rem" />
      </div>
      {expanded && (
        <div
          ref={listRef}
          id={`${id}-list`}
          className="selectList"
          role="listbox"
          popover="manual"
          aria-orientation="vertical"
          style={{
            // Reset the UA popover styles (centred, bordered, Canvas background).
            position: "fixed",
            inset: "auto",
            margin: 0,
            border: "none",
            padding: "0.25rem 0",
            boxSizing: "border-box",
            maxHeight: "50vh",
            overflowY: "auto",
            borderRadius: "4px",
            color: "var(--color-dull-12, #fff)",
            background: "var(--color-dull-3, #1f2228)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
          }}
        >
          {options.map((option, i) => (
            <div
              key={i}
              id={`${id}-${i}`}
              role="option"
              aria-selected={i === selectedIndex}
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => choose(i)}
              style={{
                display: "flex",
                gap: "0.5rem",
                padding: "0.375rem 0.75rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontWeight: i === selectedIndex ? 600 : undefined,
                background: i === highlighted ? "var(--color-dull-6, #3d4450)" : undefined,
              }}
            >
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
