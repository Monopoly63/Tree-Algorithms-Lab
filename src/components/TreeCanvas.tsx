// Tree Algorithms Lab - SVG Tree Canvas (Pure Black/White Glass)
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

// Pure white/grey only — no colors
function fillFor(kind: string | undefined, highlighted: boolean, selected: boolean): string {
  if (highlighted) return "rgba(255,255,255,0.22)";
  if (selected) return "rgba(255,255,255,0.16)";
  if (kind === "operator") return "rgba(200,200,200,0.1)";
  if (kind === "operand") return "rgba(255,255,255,0.06)";
  return "rgba(255,255,255,0.08)";
}

function strokeFor(kind: string | undefined, highlighted: boolean, selected: boolean): string {
  if (highlighted) return "rgba(255,255,255,0.7)";
  if (selected) return "rgba(255,255,255,0.55)";
  if (kind === "operator") return "rgba(255,255,255,0.4)";
  return "rgba(255,255,255,0.25)";
}

function strokeWidthFor(highlighted: boolean, selected: boolean): number {
  if (highlighted) return 2;
  if (selected) return 2;
  return 1.5;
}

function textColor(): string {
  return "#ffffff";
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
      <div className="glass-card flex items-center justify-center h-48 text-[#555555] text-sm">
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
          className="text-[#a0a0a0] text-[11px] font-semibold mb-3 px-1 uppercase"
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

        {/* Edges — pure white transparent */}
        {layout.edges.map((e) => (
          <line
            key={e.id}
            x1={e.from.x + padding}
            y1={e.from.y + padding}
            x2={e.to.x + padding}
            y2={e.to.y + padding}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1.5}
          />
        ))}

        {/* Nodes */}
        {layout.nodes.map((n) => {
          const highlighted = highlightedIds?.has(n.id) ?? false;
          const selected = selectedId === n.id;
          const fill = fillFor(n.kind, highlighted, selected);
          const stroke = strokeFor(n.kind, highlighted, selected);
          const strokeW = strokeWidthFor(highlighted, selected);

          return (
            <g
              key={n.id}
              style={{
                transition: "all 400ms ease",
                cursor: onNodeClick ? "pointer" : "default",
                filter: highlighted
                  ? "drop-shadow(0 0 10px rgba(255,255,255,0.4))"
                  : undefined,
              }}
              transform={`translate(${n.x + padding}, ${n.y + padding})`}
              onClick={() => handleClick(n)}
            >
              {highlighted && (
                <circle r={NODE_RADIUS + 8} fill="rgba(255,255,255,0.08)" />
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
                fill={textColor()}
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