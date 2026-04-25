// Tree Algorithms Lab - Tab 1: Tree Builder (Pure Black/White Glass)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { buildBT, buildBST, TreeNode, genId } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Plus, Trash2, Pencil, Wand2, Hand } from "lucide-react";

interface Props {
  onTreeBuilt: (tree: TreeNode | null) => void;
  currentTree: TreeNode | null;
}

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
          <p className="text-xs text-[#a0a0a0] mt-1">
            Build automatically from a list, or draw manually node by node.
          </p>
        </div>

        {/* Mode switcher */}
        <div className="glass-tabs flex gap-1">
          <button
            onClick={() => setMode("auto")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all ${
              mode === "auto" ? "glass-tab-active" : "text-[#666666] hover:text-white"
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Auto
          </button>
          <button
            onClick={() => setMode("manual")}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all ${
              mode === "manual" ? "glass-tab-active" : "text-[#666666] hover:text-white"
            }`}
          >
            <Hand className="w-3.5 h-3.5" strokeWidth={1.5} /> Manual
          </button>
        </div>

        {mode === "auto" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="values"
                className="text-[#a0a0a0] text-[10px] uppercase block"
                style={{ letterSpacing: "0.15em" }}
              >
                Values (comma-separated)
              </label>
              <input
                id="values"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="10,5,15,3,7"
                className="glass-input w-full px-3 py-2.5 text-sm"
              />
            </div>
            <div className="space-y-2">
              <label
                className="text-[#a0a0a0] text-[10px] uppercase block"
                style={{ letterSpacing: "0.15em" }}
              >
                Tree Type
              </label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      type === "BT"
                        ? "border-white/60 bg-white/10"
                        : "border-white/20 group-hover:border-white/40"
                    }`}
                  >
                    {type === "BT" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <input
                    type="radio"
                    name="treetype"
                    value="BT"
                    checked={type === "BT"}
                    onChange={() => setType("BT")}
                    className="sr-only"
                  />
                  <span className="text-white/90 text-sm">Binary Tree (BT)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <span
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      type === "BST"
                        ? "border-white/60 bg-white/10"
                        : "border-white/20 group-hover:border-white/40"
                    }`}
                  >
                    {type === "BST" && (
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <input
                    type="radio"
                    name="treetype"
                    value="BST"
                    checked={type === "BST"}
                    onChange={() => setType("BST")}
                    className="sr-only"
                  />
                  <span className="text-white/90 text-sm">Binary Search Tree (BST)</span>
                </label>
              </div>
            </div>
            <button
              onClick={handleAutoBuild}
              className="glass-btn w-full px-4 py-2.5 text-sm font-semibold"
            >
              Build Tree
            </button>
            {error && <div className="text-[#a0a0a0] text-xs italic">{error}</div>}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-[#a0a0a0] text-[10px] uppercase block"
                style={{ letterSpacing: "0.15em" }}
              >
                Node Value
              </label>
              <input
                type="text"
                value={nodeValue}
                onChange={(e) => setNodeValue(e.target.value)}
                placeholder="Enter value…"
                className="glass-input w-full px-3 py-2.5 text-sm"
              />
            </div>

            {!currentTree ? (
              <button
                onClick={handleAddRoot}
                className="glass-btn w-full px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Root Node
              </button>
            ) : (
              <>
                <div className="glass-output p-3 text-xs">
                  {selectedId ? (
                    <span className="text-white/90">
                      Selected: <span className="font-mono text-white">node</span>
                    </span>
                  ) : (
                    <span className="text-[#555555]">
                      Click any node in the canvas to select.
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={!selectedId}
                    onClick={() => handleAddChild("left")}
                    className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} /> Left
                  </button>
                  <button
                    disabled={!selectedId}
                    onClick={() => handleAddChild("right")}
                    className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} /> Right
                  </button>
                </div>
                <button
                  disabled={!selectedId || !nodeValue.trim()}
                  onClick={handleRename}
                  className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
                >
                  <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /> Rename selected
                </button>
                <button
                  disabled={!selectedId}
                  onClick={handleDelete}
                  className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Delete subtree
                </button>
                <button
                  onClick={handleClear}
                  className="glass-btn w-full px-3 py-2 text-xs font-semibold"
                >
                  Clear Canvas
                </button>
              </>
            )}
          </div>
        )}

        <div
          className="text-[11px] text-[#555555] pt-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          Tip: After building a tree, switch to{" "}
          <span className="text-[#a0a0a0]">Traversal Visualizer</span> to animate it.
        </div>
      </div>

      <div className="lg:col-span-2">
        <TreeCanvas
          layout={layout}
          title={
            currentTree
              ? mode === "manual"
                ? "Manual Canvas"
                : `${type} Visualization`
              : "Canvas"
          }
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