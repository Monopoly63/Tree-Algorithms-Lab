// Tree Algorithms Lab - Tab 3: Traversal Visualizer
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState, useRef, useEffect } from "react";
import { TreeNode, traverse, TraversalType, TraversalStep } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";

interface Props {
  tree: TreeNode | null;
}

export const TraversalVisualizer: React.FC<Props> = ({ tree }) => {
  const [visited, setVisited] = useState<TraversalStep[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
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
  };

  const animate = (type: TraversalType) => {
    if (!tree) return;
    reset();
    const steps = traverse(tree, type);
    setRunning(true);
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

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">Traversal Visualizer</h2>
        {!tree && (
          <div className="text-amber-400 text-sm">
            Build a tree in the "Tree Builder" tab first.
          </div>
        )}
        <div className="space-y-2">
          <Button
            disabled={!tree || running}
            onClick={() => animate("preorder")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Preorder
          </Button>
          <Button
            disabled={!tree || running}
            onClick={() => animate("inorder")}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Inorder
          </Button>
          <Button
            disabled={!tree || running}
            onClick={() => animate("postorder")}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            Postorder
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="w-full !bg-transparent !hover:bg-transparent border-slate-600 text-slate-200"
          >
            Reset
          </Button>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        <TreeCanvas layout={layout} highlightedIds={highlighted} title="Current Tree" />
        <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-2">Visited sequence</div>
          <div className="flex flex-wrap gap-2 min-h-[2rem]">
            {visited.length === 0 ? (
              <span className="text-slate-500 text-sm italic">No traversal run yet.</span>
            ) : (
              visited.map((v, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded text-sm font-mono ${
                    v.nodeId === currentId
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-100"
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