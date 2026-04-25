// Tree Algorithms Lab - Tab 1: Tree Builder
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { buildBT, buildBST, TreeNode } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  onTreeBuilt: (tree: TreeNode | null) => void;
  currentTree: TreeNode | null;
}

export const TreeBuilder: React.FC<Props> = ({ onTreeBuilt, currentTree }) => {
  const [input, setInput] = useState("10,5,15,3,7,12,20");
  const [type, setType] = useState<"BT" | "BST">("BST");
  const [error, setError] = useState<string | null>(null);

  const handleBuild = () => {
    setError(null);
    try {
      const values = input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => {
          const n = Number(s);
          if (isNaN(n)) throw new Error(`Invalid number: ${s}`);
          return n;
        });
      if (values.length === 0) {
        setError("Please enter at least one number.");
        return;
      }
      const tree = type === "BST" ? buildBST(values) : buildBT(values);
      onTreeBuilt(tree);
    } catch (e: any) {
      setError(e.message || "Failed to build tree");
    }
  };

  const layout = layoutBinaryTree(currentTree);

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-4">
        <h2 className="text-lg font-semibold text-slate-100">Tree Builder</h2>
        <div className="space-y-2">
          <Label htmlFor="values" className="text-slate-300">
            Values (comma-separated)
          </Label>
          <Input
            id="values"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="10,5,15,3,7"
            className="bg-slate-900 border-slate-700 text-slate-100"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Tree Type</Label>
          <RadioGroup value={type} onValueChange={(v) => setType(v as "BT" | "BST")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BT" id="bt" />
              <Label htmlFor="bt" className="text-slate-200">Binary Tree (BT)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="BST" id="bst" />
              <Label htmlFor="bst" className="text-slate-200">Binary Search Tree (BST)</Label>
            </div>
          </RadioGroup>
        </div>
        <Button onClick={handleBuild} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Build Tree
        </Button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div className="text-xs text-slate-400 pt-2 border-t border-slate-700">
          Tip: Build a tree here, then switch to "Traversal Visualizer" to animate.
        </div>
      </div>
      <div className="md:col-span-2">
        <TreeCanvas layout={layout} title={currentTree ? `${type} Visualization` : undefined} />
      </div>
    </div>
  );
};