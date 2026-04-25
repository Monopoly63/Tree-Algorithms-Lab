// Tree Algorithms Lab - SVG Tree Canvas
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React from "react";
import { LayoutResult } from "@/lib/layout";

interface TreeCanvasProps {
  layout: LayoutResult;
  highlightedIds?: Set<string>;
  title?: string;
}

const NODE_RADIUS = 22;

function colorFor(kind: string | undefined, highlighted: boolean): string {
  if (highlighted) return "#22C55E";
  if (kind === "operator") return "#F97316";
  if (kind === "operand") return "#14B8A6";
  return "#3B82F6";
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({ layout, highlightedIds, title }) => {
  const padding = 20;
  const width = layout.width + padding * 2;
  const height = Math.max(layout.height + padding, 160);

  if (layout.nodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 border border-dashed border-slate-700 rounded-lg">
        No tree to display
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto bg-slate-950/40 border border-slate-800 rounded-lg p-2">
      {title && <div className="text-slate-300 text-sm font-semibold mb-2 px-2">{title}</div>}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        style={{ maxHeight: "70vh" }}
      >
        {layout.edges.map((e) => (
          <line
            key={e.id}
            x1={e.from.x + padding}
            y1={e.from.y + padding}
            x2={e.to.x + padding}
            y2={e.to.y + padding}
            stroke="#475569"
            strokeWidth={2}
          />
        ))}
        {layout.nodes.map((n) => {
          const highlighted = highlightedIds?.has(n.id) ?? false;
          const fill = colorFor(n.kind, highlighted);
          return (
            <g
              key={n.id}
              style={{ transition: "all 400ms ease" }}
              transform={`translate(${n.x + padding}, ${n.y + padding})`}
            >
              <circle
                r={NODE_RADIUS}
                fill={fill}
                stroke="#0f172a"
                strokeWidth={2}
                style={{
                  transition: "fill 300ms ease, r 300ms ease",
                  filter: highlighted ? "drop-shadow(0 0 8px #22C55E)" : "none",
                }}
              >
                {highlighted && (
                  <animate
                    attributeName="r"
                    values={`${NODE_RADIUS};${NODE_RADIUS + 4};${NODE_RADIUS}`}
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                )}
              </circle>
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize={14}
                fontWeight={600}
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