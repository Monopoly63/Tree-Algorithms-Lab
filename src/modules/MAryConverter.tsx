// Tree Algorithms Lab - Tab 2: m-ary -> BT -> BST (interactive + step flow)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useMemo, useState } from "react";
import {
  maryToBT,
  btToBST,
  inorderValues,
  genId,
  MaryNode,
  TreeNode,
} from "@/lib/tree";
import { layoutMaryTree, layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Trash2,
  Pencil,
  ArrowRight,
  Code2,
  MousePointerClick,
  Play,
} from "lucide-react";

// --- Helpers ---
function cloneMary(n: MaryNode | null): MaryNode | null {
  if (!n) return null;
  return {
    id: n.id,
    value: n.value,
    children: n.children.map((c) => cloneMary(c) as MaryNode),
  };
}

function assignIds(m: { value: unknown; children?: unknown[] }): MaryNode {
  return {
    id: genId("m"),
    value: String(m.value),
    children: Array.isArray(m.children)
      ? m.children.map((c) => assignIds(c as { value: unknown; children?: unknown[] }))
      : [],
  };
}

function findMaryAndAct(
  n: MaryNode | null,
  targetId: string,
  action: (node: MaryNode) => void
): boolean {
  if (!n) return false;
  if (n.id === targetId) {
    action(n);
    return true;
  }
  for (const c of n.children) {
    if (findMaryAndAct(c, targetId, action)) return true;
  }
  return false;
}

function deleteMary(n: MaryNode | null, targetId: string): void {
  if (!n) return;
  n.children = n.children.filter((c) => c.id !== targetId);
  for (const c of n.children) deleteMary(c, targetId);
}

const SAMPLE_JSON = `{
  "value": "A",
  "children": [
    { "value": "B", "children": [
      { "value": "E", "children": [] },
      { "value": "F", "children": [] }
    ]},
    { "value": "C", "children": [
      { "value": "G", "children": [] }
    ]},
    { "value": "D", "children": [] }
  ]
}`;

const SAMPLE_TREE: MaryNode = assignIds(JSON.parse(SAMPLE_JSON));

export const MAryConverter: React.FC = () => {
  const [mode, setMode] = useState<"draw" | "json">("draw");
  const [mary, setMary] = useState<MaryNode | null>(SAMPLE_TREE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nodeValue, setNodeValue] = useState("");
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [error, setError] = useState<string | null>(null);
  const [converted, setConverted] = useState(false);
  const [bt, setBt] = useState<TreeNode | null>(null);
  const [bst, setBst] = useState<TreeNode | null>(null);
  const [beforeList, setBeforeList] = useState<string[]>([]);
  const [afterList, setAfterList] = useState<string[]>([]);

  const resetConversion = () => {
    setConverted(false);
    setBt(null);
    setBst(null);
    setBeforeList([]);
    setAfterList([]);
  };

  const updateMary = (next: MaryNode | null) => {
    setMary(next);
    resetConversion();
  };

  // Manual actions
  const handleAddRoot = () => {
    const v = nodeValue.trim() || "A";
    updateMary({ id: genId("m"), value: v, children: [] });
    setSelectedId(null);
    setNodeValue("");
  };

  const handleAddChild = () => {
    if (!selectedId || !mary) return;
    const v = nodeValue.trim() || "?";
    const clone = cloneMary(mary) as MaryNode;
    let created: MaryNode | null = null;
    findMaryAndAct(clone, selectedId, (node) => {
      const nn: MaryNode = { id: genId("m"), value: v, children: [] };
      node.children.push(nn);
      created = nn;
    });
    updateMary(clone);
    if (created) setSelectedId((created as MaryNode).id);
    setNodeValue("");
  };

  const handleRename = () => {
    if (!selectedId || !mary) return;
    const v = nodeValue.trim();
    if (!v) return;
    const clone = cloneMary(mary) as MaryNode;
    findMaryAndAct(clone, selectedId, (node) => {
      node.value = v;
    });
    updateMary(clone);
    setNodeValue("");
  };

  const handleDelete = () => {
    if (!selectedId || !mary) return;
    if (mary.id === selectedId) {
      updateMary(null);
      setSelectedId(null);
      return;
    }
    const clone = cloneMary(mary) as MaryNode;
    deleteMary(clone, selectedId);
    updateMary(clone);
    setSelectedId(null);
  };

  const handleLoadJson = () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const t = assignIds(parsed);
      updateMary(t);
      setSelectedId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON input");
    }
  };

  const handleConvert = () => {
    setError(null);
    if (!mary) {
      setError("Please build or load an m-ary tree first.");
      return;
    }
    try {
      const btTree = maryToBT(mary);
      const before = inorderValues(btTree);
      const bstTree = btToBST(btTree);
      const after = inorderValues(bstTree);
      setBt(btTree);
      setBst(bstTree);
      setBeforeList(before);
      setAfterList(after);
      setConverted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
    }
  };

  const maryLayout = useMemo(() => layoutMaryTree(mary), [mary]);
  const btLayout = useMemo(() => layoutBinaryTree(bt), [bt]);
  const bstLayout = useMemo(() => layoutBinaryTree(bst), [bst]);

  return (
    <div className="space-y-5">
      {/* Step indicator */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          {[
            { n: 1, label: "Design m-ary", active: true, done: !!mary },
            { n: 2, label: "Convert to BT", active: converted, done: !!bt },
            { n: 3, label: "Sort → BST", active: converted, done: !!bst },
          ].map((s, i, arr) => (
            <React.Fragment key={s.n}>
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border transition-all ${
                    s.done
                      ? "bg-white text-black border-white shadow-lg shadow-white/20"
                      : s.active
                      ? "bg-white/10 text-white border-white/40"
                      : "bg-transparent text-white/40 border-white/15"
                  }`}
                >
                  {s.n}
                </div>
                <div
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    s.done ? "text-white" : "text-white/50"
                  }`}
                >
                  {s.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-white/25" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Controls */}
        <div className="lg:col-span-1 glass-card p-5 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-white">m-ary Builder</h2>
            <p className="text-xs text-white/50 mt-1">
              Draw an m-ary tree visually or paste JSON, then convert.
            </p>
          </div>

          <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/10">
            <button
              onClick={() => setMode("draw")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                mode === "draw"
                  ? "bg-white text-black shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <MousePointerClick className="w-3.5 h-3.5" /> Draw
            </button>
            <button
              onClick={() => setMode("json")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold transition-all ${
                mode === "json"
                  ? "bg-white text-black shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> JSON
            </button>
          </div>

          {mode === "draw" ? (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-white/80 text-xs uppercase tracking-wider">
                  Node Value
                </Label>
                <Input
                  value={nodeValue}
                  onChange={(e) => setNodeValue(e.target.value)}
                  placeholder="e.g. A, B, 5…"
                  className="bg-black/40 border-white/15 text-white placeholder:text-white/30"
                />
              </div>

              {!mary ? (
                <Button
                  onClick={handleAddRoot}
                  className="w-full bg-white text-black hover:bg-white/90 font-semibold gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Root
                </Button>
              ) : (
                <>
                  <div className="rounded-lg bg-white/5 border border-white/10 p-3 text-xs">
                    {selectedId ? (
                      <span className="text-white/80">
                        Selected node · click others or add child
                      </span>
                    ) : (
                      <span className="text-white/50">
                        Click any node in the canvas to select it.
                      </span>
                    )}
                  </div>
                  <Button
                    disabled={!selectedId}
                    onClick={handleAddChild}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/15 gap-2 text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Child to Selected
                  </Button>
                  <Button
                    disabled={!selectedId || !nodeValue.trim()}
                    onClick={handleRename}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/15 gap-2 text-xs"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Rename
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
                    onClick={() => {
                      updateMary(null);
                      setSelectedId(null);
                    }}
                    variant="outline"
                    className="w-full !bg-transparent hover:!bg-white/5 border-white/15 text-white/70 text-xs"
                  >
                    Clear Canvas
                  </Button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Label className="text-white/80 text-xs uppercase tracking-wider">
                m-ary JSON
              </Label>
              <Textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                className="bg-black/40 border-white/15 text-white placeholder:text-white/30 font-mono text-xs"
              />
              <Button
                onClick={handleLoadJson}
                className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/15 font-semibold"
              >
                Load JSON
              </Button>
            </div>
          )}

          <div className="pt-3 border-t border-white/10">
            <Button
              onClick={handleConvert}
              disabled={!mary}
              className="w-full bg-white text-black hover:bg-white/90 font-semibold gap-2"
            >
              <Play className="w-4 h-4" /> Run Conversion
            </Button>
            {error && <div className="text-red-400 text-xs mt-2">{error}</div>}
            <div className="text-[11px] text-white/40 mt-3">
              Algorithm: Left-Child Right-Sibling → inorder → sort → rebuild BST
            </div>
          </div>
        </div>

        {/* Visualizations */}
        <div className="lg:col-span-2 space-y-4">
          <TreeCanvas
            layout={maryLayout}
            title="① m-ary Tree"
            selectedId={selectedId}
            onNodeClick={mode === "draw" ? (id) => setSelectedId(id) : undefined}
            emptyHint="Add a root node to start drawing your m-ary tree."
          />

          {converted && (
            <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up">
              <TreeCanvas layout={btLayout} title="② Binary Tree (LCRS)" />
              <TreeCanvas layout={bstLayout} title="③ BST (sorted)" />
            </div>
          )}
        </div>
      </div>

      {converted && (
        <div className="grid md:grid-cols-2 gap-4 animate-fade-in-up">
          <div className="glass-card p-4">
            <div className="text-[11px] uppercase tracking-wider text-white/50 mb-2">
              Inorder BEFORE (of BT)
            </div>
            <div className="flex flex-wrap gap-2">
              {beforeList.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/90 font-mono text-xs"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="text-[11px] uppercase tracking-wider text-white/50 mb-2">
              Inorder AFTER (of BST)
            </div>
            <div className="flex flex-wrap gap-2">
              {afterList.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white text-black font-mono text-xs font-semibold"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};