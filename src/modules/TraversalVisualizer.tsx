// Tree Algorithms Lab - Tab 3: Traversal Visualizer (glass theme)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState, useRef, useEffect } from "react";
import { TreeNode, traverse, TraversalType, TraversalStep } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { RotateCcw, Play } from "lucide-react";

interface Props {
  tree: TreeNode | null;
}

export const TraversalVisualizer: React.FC<Props> = ({ tree }) => {
  const [visited, setVisited] = useState<TraversalStep[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [activeType, setActiveType] = useState<TraversalType | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  const reset = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
    setVisited([]);
    setCurrentId(null);
    setRunning(false);
    setActiveType(null);
  };

  const animate = (type: TraversalType) => {
    if (!tree) return;
    reset();
    const steps = traverse(tree, type);
    setRunning(true);
    setActiveType(type);
    steps.forEach((step, i) => {
      const t = window.setTimeout(() => {
        setCurrentId(step.nodeId);
        setVisited((prev) => [...prev, step]);
        if (i === steps.length - 1) {
          const clearT = window.setTimeout(() => {
            setCurrentId(null);
            setRunning(false);
          }, 600);
          timeoutsRef.current.push(clearT);
        }
      }, i * 600);
      timeoutsRef.current.push(t);
    });
  };

  const layout = layoutBinaryTree(tree);
  const highlighted = new Set<string>(visited.map((v) => v.nodeId));

  const traversalOptions: { type: TraversalType; label: string }[] = [
    { type: "preorder", label: "Preorder" },
    { type: "inorder", label: "Inorder" },
    { type: "postorder", label: "Postorder" },
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 glass-card p-5 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Traversal Visualizer</h2>
          <p className="text-xs text-white/50 mt-1">Animated at ~600ms per step.</p>
        </div>
        {!tree && (
          <div className="rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs p-3">
            Build a tree in the <span className="font-semibold">Tree Builder</span> tab first.
          </div>
        )}
        <div className="space-y-2">
          {traversalOptions.map((opt) => (
            <Button
              key={opt.type}
              disabled={!tree || running}
              onClick={() => animate(opt.type)}
              className={`w-full gap-2 font-semibold transition-all ${
                activeType === opt.type
                  ? "bg-white text-black hover:bg-white/90"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
              }`}
            >
              <Play className="w-3.5 h-3.5" /> {opt.label}
            </Button>
          ))}
          <Button
            onClick={reset}
            variant="outline"
            className="w-full !bg-transparent hover:!bg-white/5 border-white/15 text-white/70 gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
        {tree && visited.length > 0 && (
          <div className="text-[11px] text-white/50 pt-3 border-t border-white/10">
            Progress: <span className="text-white/90">{visited.length}</span> node
            {visited.length === 1 ? "" : "s"} visited
          </div>
        )}
      </div>
      <div className="lg:col-span-2 space-y-4">
        <TreeCanvas layout={layout} highlightedIds={highlighted} title="Current Tree" />
        <div className="glass-card p-4">
          <div className="text-[11px] uppercase tracking-wider text-white/50 mb-2">
            Visited sequence {activeType && `· ${activeType}`}
          </div>
          <div className="flex flex-wrap gap-2 min-h-[2rem]">
            {visited.length === 0 ? (
              <span className="text-white/30 text-sm italic">No traversal run yet.</span>
            ) : (
              visited.map((v, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-all ${
                    v.nodeId === currentId
                      ? "bg-white text-black shadow-lg shadow-white/20 scale-110"
                      : "bg-white/10 text-white border border-white/10"
                  }`}
                >
                  {v.value}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};