// Tree Algorithms Lab - Tab 1: Tree Builder (Pure Black/White Glass)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { buildBT, buildBST, TreeNode, genId } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Plus, Trash2, Pencil, Wand2, Hand, AlertCircle, CheckCircle2 } from "lucide-react";

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

function findNode(n: TreeNode | null, targetId: string): TreeNode | null {
  if (!n) return null;
  if (n.id === targetId) return n;
  return findNode(n.left, targetId) || findNode(n.right, targetId);
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

// Get the path of ancestors (from root to node) — used for BST bounds checking
function getPathToNode(
  root: TreeNode | null,
  targetId: string,
  path: TreeNode[] = []
): TreeNode[] | null {
  if (!root) return null;
  const newPath = [...path, root];
  if (root.id === targetId) return newPath;
  const l = getPathToNode(root.left, targetId, newPath);
  if (l) return l;
  return getPathToNode(root.right, targetId, newPath);
}

// Compute valid (min, max) bounds for a new child inserted under `targetId` on `side`
// following the BST property (given the entire ancestry chain).
function computeBstBounds(
  root: TreeNode,
  targetId: string,
  side: "left" | "right"
): { min: number; max: number; target: TreeNode } | null {
  const path = getPathToNode(root, targetId);
  if (!path) return null;
  const target = path[path.length - 1];
  const tVal = Number(target.value);
  if (isNaN(tVal)) return null;

  // Start with the most restrictive bound coming from the target itself + the chosen side.
  let min = -Infinity;
  let max = Infinity;
  if (side === "left") max = tVal; // strict less than target
  else min = tVal; // strict greater than target

  // Walk ancestors to tighten bounds based on the path direction at each step.
  for (let i = 0; i < path.length - 1; i++) {
    const parent = path[i];
    const child = path[i + 1];
    const pVal = Number(parent.value);
    if (isNaN(pVal)) continue;
    if (parent.left && parent.left.id === child.id) {
      // current subtree must be < parent
      if (pVal < max) max = pVal;
    } else if (parent.right && parent.right.id === child.id) {
      // current subtree must be > parent
      if (pVal > min) min = pVal;
    }
  }
  return { min, max, target };
}

// Check uniqueness (no duplicate values across the whole tree) — BSTs here disallow dups
function containsValue(n: TreeNode | null, val: number): boolean {
  if (!n) return false;
  if (Number(n.value) === val) return true;
  return containsValue(n.left, val) || containsValue(n.right, val);
}

export const TreeBuilder: React.FC<Props> = ({ onTreeBuilt, currentTree }) => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [input, setInput] = useState("10,5,15,3,7,12,20");
  const [type, setType] = useState<"BT" | "BST">("BST");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nodeValue, setNodeValue] = useState("");

  const flashError = (msg: string) => {
    setError(msg);
    setInfo(null);
    window.setTimeout(() => setError((e) => (e === msg ? null : e)), 3500);
  };
  const flashInfo = (msg: string) => {
    setInfo(msg);
    setError(null);
    window.setTimeout(() => setInfo((e) => (e === msg ? null : e)), 2500);
  };

  const handleAutoBuild = () => {
    setError(null);
    setInfo(null);
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
      flashInfo(`${type} built successfully from ${values.length} value${values.length > 1 ? "s" : ""}.`);
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
    setError(null);
    const v = nodeValue.trim();
    if (!v) {
      flashError("Please enter a value for the root node.");
      return;
    }
    if (type === "BST" && isNaN(Number(v))) {
      flashError("BST nodes must be numeric.");
      return;
    }
    const n = makeNode(v);
    onTreeBuilt(n);
    setSelectedId(n.id);
    setNodeValue("");
    flashInfo(`Root node "${v}" created.`);
  };

  // For BST in manual mode: user gives the value, algorithm decides where it goes.
  // We ignore the "side" button (or better: auto-pick) — but since user clicked a side,
  // we validate that the chosen side matches the BST rule; otherwise we auto-correct
  // and inform the user.
  const handleAddChild = (side: "left" | "right") => {
    setError(null);
    if (!selectedId || !currentTree) return;
    const raw = nodeValue.trim();
    if (!raw) {
      flashError("Please enter a value before adding a child.");
      return;
    }

    const target = findNode(currentTree, selectedId);
    if (!target) {
      flashError("Selected node no longer exists.");
      return;
    }

    // --- BST MODE: enforce ordering ---
    if (type === "BST") {
      const newVal = Number(raw);
      if (isNaN(newVal)) {
        flashError("BST only accepts numeric values.");
        return;
      }

      // No duplicates allowed in a classic BST
      if (containsValue(currentTree, newVal)) {
        flashError(`Value ${newVal} already exists in the BST (duplicates are not allowed).`);
        return;
      }

      // Check the ancestry bounds given the chosen side
      const bounds = computeBstBounds(currentTree, selectedId, side);
      if (!bounds) {
        flashError("Could not compute BST bounds for this node.");
        return;
      }
      const tVal = Number(target.value);

      // 1) Reject if the chosen side violates the DIRECT parent rule
      if (side === "left" && newVal >= tVal) {
        flashError(
          `BST rule violated: ${newVal} must be LESS than ${tVal} to be its LEFT child. Try the right side instead.`
        );
        return;
      }
      if (side === "right" && newVal <= tVal) {
        flashError(
          `BST rule violated: ${newVal} must be GREATER than ${tVal} to be its RIGHT child. Try the left side instead.`
        );
        return;
      }

      // 2) Reject if the value breaks ancestor bounds (classical BST property)
      if (newVal <= bounds.min || newVal >= bounds.max) {
        const minStr = bounds.min === -Infinity ? "-∞" : String(bounds.min);
        const maxStr = bounds.max === Infinity ? "+∞" : String(bounds.max);
        flashError(
          `BST rule violated: value must be strictly between ${minStr} and ${maxStr} at this position.`
        );
        return;
      }

      // 3) Reject if slot already occupied
      if (target[side]) {
        flashError(`The ${side} child of "${target.value}" is already occupied.`);
        return;
      }

      // All good — insert
      const clone = cloneTree(currentTree)!;
      let created: TreeNode | null = null;
      findAndAct(clone, selectedId, (node) => {
        const nn = makeNode(raw);
        node[side] = nn;
        created = nn;
      });
      onTreeBuilt(clone);
      if (created) setSelectedId((created as TreeNode).id);
      setNodeValue("");
      flashInfo(`Inserted ${newVal} as ${side} child of ${target.value}.`);
      return;
    }

    // --- BT MODE: free insertion ---
    if (target[side]) {
      flashError(`The ${side} child of "${target.value}" is already occupied.`);
      return;
    }
    const clone = cloneTree(currentTree)!;
    let created: TreeNode | null = null;
    findAndAct(clone, selectedId, (node) => {
      const nn = makeNode(raw);
      node[side] = nn;
      created = nn;
    });
    onTreeBuilt(clone);
    if (created) setSelectedId((created as TreeNode).id);
    setNodeValue("");
    flashInfo(`Inserted "${raw}" as ${side} child of "${target.value}".`);
  };

  // Smart BST insert: user just gives a value, algorithm walks from root and places it.
  const handleSmartBstInsert = () => {
    setError(null);
    if (!currentTree) return;
    const raw = nodeValue.trim();
    if (!raw) {
      flashError("Please enter a value to insert.");
      return;
    }
    const newVal = Number(raw);
    if (isNaN(newVal)) {
      flashError("BST only accepts numeric values.");
      return;
    }
    if (containsValue(currentTree, newVal)) {
      flashError(`Value ${newVal} already exists in the BST.`);
      return;
    }
    const clone = cloneTree(currentTree)!;
    const placement: { parentValue: string; side: "left" | "right" } | null = { parentValue: "", side: "left" };

    const insert = (n: TreeNode): void => {
      const nVal = Number(n.value);
      if (newVal < nVal) {
        if (!n.left) {
          n.left = makeNode(raw);
          placement.parentValue = n.value;
          placement.side = "left";
          setSelectedId(n.left.id);
        } else {
          insert(n.left);
        }
      } else {
        if (!n.right) {
          n.right = makeNode(raw);
          placement.parentValue = n.value;
          placement.side = "right";
          setSelectedId(n.right.id);
        } else {
          insert(n.right);
        }
      }
    };
    insert(clone);
    onTreeBuilt(clone);
    setNodeValue("");
    flashInfo(
      `Inserted ${newVal} as ${placement.side} child of ${placement.parentValue} (BST rule).`
    );
  };

  const handleRename = () => {
    setError(null);
    if (!selectedId || !currentTree) return;
    const v = nodeValue.trim();
    if (!v) return;

    if (type === "BST") {
      if (isNaN(Number(v))) {
        flashError("BST only accepts numeric values.");
        return;
      }
      const newVal = Number(v);
      const target = findNode(currentTree, selectedId);
      if (!target) return;
      // Validate new value against ancestor bounds (subtree bounds of the slot it occupies)
      const path = getPathToNode(currentTree, selectedId);
      if (path && path.length > 1) {
        let min = -Infinity;
        let max = Infinity;
        for (let i = 0; i < path.length - 1; i++) {
          const parent = path[i];
          const child = path[i + 1];
          const pVal = Number(parent.value);
          if (parent.left && parent.left.id === child.id) {
            if (pVal < max) max = pVal;
          } else if (parent.right && parent.right.id === child.id) {
            if (pVal > min) min = pVal;
          }
        }
        if (newVal <= min || newVal >= max) {
          const minStr = min === -Infinity ? "-∞" : String(min);
          const maxStr = max === Infinity ? "+∞" : String(max);
          flashError(
            `BST rule violated: value must be strictly between ${minStr} and ${maxStr} at this position.`
          );
          return;
        }
      }
      // Also must respect target's own subtree (all left < v < all right)
      const subLeftMax = (n: TreeNode | null): number => {
        if (!n) return -Infinity;
        return Math.max(Number(n.value), subLeftMax(n.left), subLeftMax(n.right));
      };
      const subRightMin = (n: TreeNode | null): number => {
        if (!n) return Infinity;
        return Math.min(Number(n.value), subRightMin(n.left), subRightMin(n.right));
      };
      const lMax = subLeftMax(target.left);
      const rMin = subRightMin(target.right);
      if (newVal <= lMax || newVal >= rMin) {
        flashError(
          `BST rule violated: value must be greater than ${lMax === -Infinity ? "-∞" : lMax} and less than ${rMin === Infinity ? "+∞" : rMin} for its subtree.`
        );
        return;
      }
      // Uniqueness
      if (Number(target.value) !== newVal && containsValue(currentTree, newVal)) {
        flashError(`Value ${newVal} already exists in the BST.`);
        return;
      }
    }

    const clone = cloneTree(currentTree)!;
    findAndAct(clone, selectedId, (node) => {
      node.value = v;
    });
    onTreeBuilt(clone);
    setNodeValue("");
    flashInfo(`Renamed to "${v}".`);
  };

  const handleDelete = () => {
    setError(null);
    if (!selectedId || !currentTree) return;
    if (currentTree.id === selectedId) {
      onTreeBuilt(null);
      setSelectedId(null);
      flashInfo("Tree cleared.");
      return;
    }
    const clone = cloneTree(currentTree)!;
    deleteFromTree(clone, selectedId);
    onTreeBuilt(clone);
    setSelectedId(null);
    flashInfo("Subtree deleted.");
  };

  const handleClear = () => {
    setError(null);
    onTreeBuilt(null);
    setSelectedId(null);
  };

  const layout = layoutBinaryTree(currentTree);
  const selectedNode = selectedId && currentTree ? findNode(currentTree, selectedId) : null;

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

        {/* Tree Type (shared for both modes) */}
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
                {type === "BT" && <span className="w-2 h-2 rounded-full bg-white"></span>}
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
                {type === "BST" && <span className="w-2 h-2 rounded-full bg-white"></span>}
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
          {mode === "manual" && type === "BST" && (
            <p className="text-[10px] text-[#a0a0a0] leading-relaxed mt-1">
              In BST mode, values are validated against ordering rules. Left child must be{" "}
              <span className="text-white">smaller</span>, right child must be{" "}
              <span className="text-white">greater</span>, and duplicates are rejected.
            </p>
          )}
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
            <button
              onClick={handleAutoBuild}
              className="glass-btn w-full px-4 py-2.5 text-sm font-semibold"
            >
              Build Tree
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-[#a0a0a0] text-[10px] uppercase block"
                style={{ letterSpacing: "0.15em" }}
              >
                Node Value {type === "BST" && <span className="text-white/70">(numeric)</span>}
              </label>
              <input
                type="text"
                value={nodeValue}
                onChange={(e) => setNodeValue(e.target.value)}
                placeholder={type === "BST" ? "e.g. 42" : "Enter value…"}
                className="glass-input w-full px-3 py-2.5 text-sm"
                inputMode={type === "BST" ? "numeric" : "text"}
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
                  {selectedNode ? (
                    <span className="text-white/90">
                      Selected:{" "}
                      <span className="font-mono text-white">"{selectedNode.value}"</span>
                    </span>
                  ) : (
                    <span className="text-[#555555]">
                      Click any node in the canvas to select.
                    </span>
                  )}
                </div>

                {/* BST Smart Insert (full BST insert from root) */}
                {type === "BST" && (
                  <button
                    disabled={!nodeValue.trim()}
                    onClick={handleSmartBstInsert}
                    className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
                    title="Insert value following BST rules starting from the root"
                  >
                    <Wand2 className="w-3.5 h-3.5" strokeWidth={1.5} /> BST Insert (auto-place)
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    disabled={!selectedId || !nodeValue.trim()}
                    onClick={() => handleAddChild("left")}
                    className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} /> Left
                  </button>
                  <button
                    disabled={!selectedId || !nodeValue.trim()}
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

        {/* Feedback */}
        {error && (
          <div className="glass-output p-3 text-xs flex items-start gap-2 border border-white/10">
            <AlertCircle className="w-4 h-4 text-white/80 shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-white/90 leading-relaxed">{error}</span>
          </div>
        )}
        {info && !error && (
          <div className="glass-output p-3 text-xs flex items-start gap-2 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-white/90 leading-relaxed">{info}</span>
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
                ? `Manual Canvas · ${type}`
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