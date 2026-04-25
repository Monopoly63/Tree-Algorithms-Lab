// Tree Algorithms Lab - Tab 1: Tree Builder (with Manual Drawing mode)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { buildBT, buildBST, TreeNode, genId } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2, Pencil, Wand2, Hand } from "lucide-react";

interface Props {
  onTreeBuilt: (tree: TreeNode | null) => void;
  currentTree: TreeNode | null;
}

// ---- helpers for manual binary tree editing ----
function cloneTree(n: TreeNode | null): TreeNode | null {
  if (!n) return null;
  return {
    id: n.id,
    value: n.value,
    left: cloneTree(n.left),
    right: cloneTree(n.right),
    kind: n.kind,
  };
}

function findAndAct(
  n: TreeNode | null,
  targetId: string,
  action: (node: TreeNode) => void
): boolean {
  if (!n) return false;
  if (n.id === targetId) {
    action(n);
    return true;
  }
  return findAndAct(n.left, targetId, action) || findAndAct(n.right, targetId, action);
}

function deleteFromTree(n: TreeNode | null, targetId: string): TreeNode | null {
  if (!n) return null;
  if (n.left && n.left.id === targetId) n.left = null;
  else deleteFromTree(n.left, targetId);
  if (n.right && n.right.id === targetId) n.right = null;
  else deleteFromTree(n.right, targetId);
  return n;
}

export const TreeBuilder: React.FC<Props> = ({ onTreeBuilt, currentTree }) => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [input, setInput] = useState("10,5,15,3,7,12,20");
  const [type, setType] = useState<"BT" | "BST">("BST");
  const [error, setError] = useState<string | null>(null);

  // Manual mode state
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nodeValue, setNodeValue] = useState("");

  const handleAutoBuild = () => {
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
      setSelectedId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to build tree");
    }
  };

  // ---- Manual mode actions ----
  const makeNode = (val: string): TreeNode => ({
    id: genId(),
    value: val,
    left: null,
    right: null,
    kind: "default",
  });

  const handleAddRoot = () => {
    const v = nodeValue.trim() || "1";
    const n = makeNode(v);
    onTreeBuilt(n);
    setSelectedId(n.id);
    setNodeValue("");
  };

  const handleAddChild = (side: "left" | "right") => {
    if (!selectedId || !currentTree) return;
    const v = nodeValue.trim() || "?";
    const clone = cloneTree(currentTree);
    let created: TreeNode | null = null;
    findAndAct(clone, selectedId, (node) => {
      if (node[side]) return;
      const nn = makeNode(v);
      node[side] = nn;
      created = nn;
    });
    onTreeBuilt(clone);
    if (created) setSelectedId((created as TreeNode).id);
    setNodeValue("");
  };

  const handleRename = () => {
    if (!selectedId || !currentTree) return;
    const v = nodeValue.trim();
    if (!v) return;
    const clone = cloneTree(currentTree);
    findAndAct(clone, selectedId, (node) => {
      node.value = v;
    });
    onTreeBuilt(clone);
    setNodeValue("");
  };

  const handleDelete = () => {
    if (!selectedId || !currentTree) return;
    if (currentTree.id === selectedId) {
      onTreeBuilt(null);
      setSelectedId(null);
      return;
    }
    const clone = cloneTree(currentTree);
    deleteFromTree(clone, selectedId);
    onTreeBuilt(clone);
    setSelectedId(null);
  };

  const handleClear = () => {
    onTreeBuilt(null);
    setSelectedId(null);
  };

  const layout = layoutBinaryTree(currentTree);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 glass-card p-5 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-white tracking-wide">Tree Builder</h2>
          <p className="text-xs text-white/50 mt-1">
            Build automatically from a list, or draw manually node by node.
          </p>
        </div>

        {/* Mode switcher */}
        <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
          <button
            onClick={() => setMode("auto")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
              mode === "auto"
                ? "bg-white text-black shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" /> Auto
          </button>
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
              mode === "manual"
                ? "bg-white text-black shadow"
                : "text-white/60 hover:text-white"
            }`}
          >
            <Hand className="w-3.5 h-3.5" /> Manual
          </button>
        </div>

        {mode === "auto" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="values" className="text-white/80 text-xs uppercase tracking-wider">
                Values (comma-separated)
              </Label>
              <Input
                id="values"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="10,5,15,3,7"
                className="bg-black/40 border-white/15 text-white placeholder:text-white/30"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white/80 text-xs uppercase tracking-wider">Tree Type</Label>
              <RadioGroup value={type} onValueChange={(v) => setType(v as "BT" | "BST")}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BT" id="bt" className="border-white/40 text-white" />
                  <Label htmlFor="bt" className="text-white/90 text-sm">
                    Binary Tree (BT)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="BST" id="bst" className="border-white/40 text-white" />
                  <Label htmlFor="bst" className="text-white/90 text-sm">
                    Binary Search Tree (BST)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button
              onClick={handleAutoBuild}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold"
            >
              Build Tree
            </Button>
            {error && <div className="text-red-400 text-xs">{error}</div>}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white/80 text-xs uppercase tracking-wider">
                Node Value
              </Label>
              <Input
                value={nodeValue}
                onChange={(e) => setNodeValue(e.target.value)}
                placeholder="Enter value…"
                className="bg-black/40 border-white/15 text-white placeholder:text-white/30"
              />
            </div>

            {!currentTree ? (
              <Button
                onClick={handleAddRoot}
                className="w-full bg-white text-black hover:bg-white/90 font-semibold gap-2"
              >
                <Plus className="w-4 h-4" /> Add Root Node
              </Button>
            ) : (
              <>
                <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-xs">
                  {selectedId ? (
                    <span className="text-white/80">
                      Selected: <span className="font-mono text-white">node</span>
                    </span>
                  ) : (
                    <span className="text-white/50">Click any node in the canvas to select.</span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    disabled={!selectedId}
                    onClick={() => handleAddChild("left")}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/15 gap-1 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Left
                  </Button>
                  <Button
                    disabled={!selectedId}
                    onClick={() => handleAddChild("right")}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/15 gap-1 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Right
                  </Button>
                </div>
                <Button
                  disabled={!selectedId || !nodeValue.trim()}
                  onClick={handleRename}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/15 gap-2 text-xs"
                >
                  <Pencil className="w-3.5 h-3.5" /> Rename selected
                </Button>
                <Button
                  disabled={!selectedId}
                  onClick={handleDelete}
                  variant="outline"
                  className="w-full !bg-transparent hover:!bg-red-500/10 border-red-500/40 text-red-300 gap-2 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete subtree
                </Button>
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="w-full !bg-transparent hover:!bg-white/5 border-white/15 text-white/70 text-xs"
                >
                  Clear Canvas
                </Button>
              </>
            )}
          </div>
        )}

        <div className="text-[11px] text-white/40 pt-3 border-t border-white/10">
          Tip: After building a tree, switch to <span className="text-white/70">Traversal
          Visualizer</span> to animate it.
        </div>
      </div>

      <div className="lg:col-span-2">
        <TreeCanvas
          layout={layout}
          title={currentTree ? (mode === "manual" ? "Manual Canvas" : `${type} Visualization`) : "Canvas"}
          selectedId={selectedId}
          onNodeClick={mode === "manual" ? (id) => setSelectedId(id) : undefined}
          emptyHint={
            mode === "manual"
              ? "Start by adding a root node on the left."
              : "Build a tree to see it here."
          }
        />
      </div>
    </div>
  );
};