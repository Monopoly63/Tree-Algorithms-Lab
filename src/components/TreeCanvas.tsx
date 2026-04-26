// Tree Algorithms Lab - SVG Tree Canvas
// Uses CSS variables so colors adapt automatically in light/dark mode.
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useEffect, useMemo, useState } from "react";
import { LayoutResult, PositionedNode } from "@/lib/layout";

export interface NodeAction {
  label: string;
  onClick: (nodeId: string) => void;
  icon?: React.ReactNode;
  color?: string;
}

interface TreeCanvasProps {
  layout: LayoutResult;
  highlightedIds?: Set<string>;
  title?: string;
  selectedId?: string | null;
  onNodeClick?: (nodeId: string) => void;
  emptyHint?: string;
}

const NODE_RADIUS = 24;

/** Resolve the current theme by reading the class on <html>. */
function useTheme(): "light" | "dark" {
  const get = (): "light" | "dark" => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.classList.contains("theme-light")
      ? "light"
      : "dark";
  };
  const [theme, setTheme] = useState<"light" | "dark">(get);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const target = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(get());
    });
    observer.observe(target, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

interface Palette {
  /** Node text (value) */
  text: string;
  /** Node stroke (default) */
  nodeStroke: string;
  /** Node stroke when highlighted */
  nodeStrokeHighlight: string;
  /** Node stroke when selected */
  nodeStrokeSelected: string;
  /** Node fill (default) */
  nodeFill: string;
  /** Node fill (operator) */
  nodeFillOperator: string;
  /** Node fill (operand) */
  nodeFillOperand: string;
  /** Node fill when highlighted */
  nodeFillHighlight: string;
  /** Node fill when selected */
  nodeFillSelected: string;
  /** Edge color */
  edge: string;
  /** Highlight glow halo around highlighted node */
  halo: string;
  /** Drop shadow css filter for highlighted node */
  highlightShadow: string;
}

const DARK_PALETTE: Palette = {
  text: "#ffffff",
  nodeStroke: "rgba(255,255,255,0.28)",
  nodeStrokeHighlight: "rgba(255,255,255,0.8)",
  nodeStrokeSelected: "rgba(255,255,255,0.6)",
  nodeFill: "rgba(255,255,255,0.08)",
  nodeFillOperator: "rgba(200,200,200,0.12)",
  nodeFillOperand: "rgba(255,255,255,0.06)",
  nodeFillHighlight: "rgba(255,255,255,0.22)",
  nodeFillSelected: "rgba(255,255,255,0.16)",
  edge: "rgba(255,255,255,0.22)",
  halo: "rgba(255,255,255,0.08)",
  highlightShadow: "drop-shadow(0 0 10px rgba(255,255,255,0.4))",
};

// Light palette — strong contrast on the near-white card background.
// Nodes are near-black with a subtle slate fill so text stays highly
// readable. Edges are dark enough to be visible through the glass.
const LIGHT_PALETTE: Palette = {
  text: "#0a0f1a",
  nodeStroke: "rgba(15,23,42,0.55)",
  nodeStrokeHighlight: "#0a0f1a",
  nodeStrokeSelected: "rgba(15,23,42,0.85)",
  nodeFill: "rgba(15,23,42,0.08)",
  nodeFillOperator: "rgba(79,70,229,0.16)",
  nodeFillOperand: "rgba(14,165,233,0.14)",
  nodeFillHighlight: "rgba(14,165,233,0.35)",
  nodeFillSelected: "rgba(99,102,241,0.22)",
  edge: "rgba(15,23,42,0.55)",
  halo: "rgba(14,165,233,0.18)",
  highlightShadow: "drop-shadow(0 0 10px rgba(14,165,233,0.45))",
};

function fillFor(
  palette: Palette,
  kind: string | undefined,
  highlighted: boolean,
  selected: boolean,
): string {
  if (highlighted) return palette.nodeFillHighlight;
  if (selected) return palette.nodeFillSelected;
  if (kind === "operator") return palette.nodeFillOperator;
  if (kind === "operand") return palette.nodeFillOperand;
  return palette.nodeFill;
}

function strokeFor(
  palette: Palette,
  highlighted: boolean,
  selected: boolean,
): string {
  if (highlighted) return palette.nodeStrokeHighlight;
  if (selected) return palette.nodeStrokeSelected;
  return palette.nodeStroke;
}

function strokeWidthFor(highlighted: boolean, selected: boolean): number {
  if (highlighted) return 2.25;
  if (selected) return 2;
  return 1.5;
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({
  layout,
  highlightedIds,
  title,
  selectedId,
  onNodeClick,
  emptyHint,
}) => {
  const theme = useTheme();
  const palette = useMemo<Palette>(
    () => (theme === "light" ? LIGHT_PALETTE : DARK_PALETTE),
    [theme],
  );

  const padding = 24;
  const width = layout.width + padding * 2;
  const height = Math.max(layout.height + padding, 180);

  if (layout.nodes.length === 0) {
    return (
      <div className="glass-card flex items-center justify-center h-48 text-muted-glass text-sm">
        {emptyHint || "No tree to display"}
      </div>
    );
  }

  const handleClick = (n: PositionedNode) => {
    if (onNodeClick) onNodeClick(n.id);
  };

  return (
    <div className="glass-card w-full overflow-auto p-4 animate-fade-in-up">
      {title && (
        <div
          className="text-secondary text-[11px] font-semibold mb-3 px-1 uppercase"
          style={{ letterSpacing: "0.15em" }}
        >
          {title}
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        style={{ maxHeight: "70vh", background: "transparent" }}
      >
        <defs>
          <filter id="softglow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {layout.edges.map((e) => (
          <line
            key={e.id}
            x1={e.from.x + padding}
            y1={e.from.y + padding}
            x2={e.to.x + padding}
            y2={e.to.y + padding}
            stroke={palette.edge}
            strokeWidth={1.75}
            strokeLinecap="round"
          />
        ))}

        {/* Nodes */}
        {layout.nodes.map((n) => {
          const highlighted = highlightedIds?.has(n.id) ?? false;
          const selected = selectedId === n.id;
          const fill = fillFor(palette, n.kind, highlighted, selected);
          const stroke = strokeFor(palette, highlighted, selected);
          const strokeW = strokeWidthFor(highlighted, selected);

          return (
            <g
              key={n.id}
              style={{
                transition: "all 400ms ease",
                cursor: onNodeClick ? "pointer" : "default",
                filter: highlighted ? palette.highlightShadow : undefined,
              }}
              transform={`translate(${n.x + padding}, ${n.y + padding})`}
              onClick={() => handleClick(n)}
            >
              {highlighted && (
                <circle r={NODE_RADIUS + 8} fill={palette.halo} />
              )}
              <circle
                r={NODE_RADIUS}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeW}
                style={{
                  transition: "fill 300ms ease, stroke 300ms ease",
                }}
              >
                {highlighted && (
                  <animate
                    attributeName="r"
                    values={`${NODE_RADIUS};${NODE_RADIUS + 3};${NODE_RADIUS}`}
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill={palette.text}
                fontSize={13}
                fontWeight={700}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {n.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};