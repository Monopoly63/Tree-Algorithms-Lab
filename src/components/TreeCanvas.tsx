// Tree Algorithms Lab - SVG Tree Canvas (glass/blur theme + editable mode)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React from "react";
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

function fillFor(kind: string | undefined, highlighted: boolean, selected: boolean): string {
  if (highlighted) return "#ffffff";
  if (selected) return "#e5e5e5";
  if (kind === "operator") return "#262626";
  if (kind === "operand") return "#171717";
  return "#1f1f1f";
}

function strokeFor(kind: string | undefined, highlighted: boolean, selected: boolean): string {
  if (highlighted) return "#ffffff";
  if (selected) return "#ffffff";
  if (kind === "operator") return "rgba(255,255,255,0.6)";
  if (kind === "operand") return "rgba(255,255,255,0.35)";
  return "rgba(255,255,255,0.25)";
}

function textColor(kind: string | undefined, highlighted: boolean): string {
  if (highlighted) return "#000000";
  if (kind === "operator") return "#ffffff";
  return "#f5f5f5";
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({
  layout,
  highlightedIds,
  title,
  selectedId,
  onNodeClick,
  emptyHint,
}) => {
  const padding = 24;
  const width = layout.width + padding * 2;
  const height = Math.max(layout.height + padding, 180);

  if (layout.nodes.length === 0) {
    return (
      <div className="glass-card flex items-center justify-center h-48 text-white/40 text-sm">
        {emptyHint || "No tree to display"}
      </div>
    );
  }

  const handleClick = (n: PositionedNode) => {
    if (onNodeClick) onNodeClick(n.id);
  };

  return (
    <div className="glass-card w-full overflow-auto p-3 animate-fade-in-up">
      {title && (
        <div className="text-white/80 text-sm font-semibold mb-2 px-1 tracking-wide uppercase">
          {title}
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        style={{ maxHeight: "70vh" }}
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
        {layout.edges.map((e) => (
          <line
            key={e.id}
            x1={e.from.x + padding}
            y1={e.from.y + padding}
            x2={e.to.x + padding}
            y2={e.to.y + padding}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1.5}
          />
        ))}
        {layout.nodes.map((n) => {
          const highlighted = highlightedIds?.has(n.id) ?? false;
          const selected = selectedId === n.id;
          const fill = fillFor(n.kind, highlighted, selected);
          const stroke = strokeFor(n.kind, highlighted, selected);
          const tColor = textColor(n.kind, highlighted);
          return (
            <g
              key={n.id}
              style={{
                transition: "all 400ms ease",
                cursor: onNodeClick ? "pointer" : "default",
              }}
              transform={`translate(${n.x + padding}, ${n.y + padding})`}
              onClick={() => handleClick(n)}
            >
              {highlighted && (
                <circle r={NODE_RADIUS + 8} fill="rgba(255,255,255,0.12)" />
              )}
              <circle
                r={NODE_RADIUS}
                fill={fill}
                stroke={stroke}
                strokeWidth={selected || highlighted ? 2.5 : 1.5}
                filter={highlighted ? "url(#softglow)" : undefined}
                style={{
                  transition: "fill 300ms ease, r 300ms ease",
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
                fill={tColor}
                fontSize={13}
                fontWeight={600}
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