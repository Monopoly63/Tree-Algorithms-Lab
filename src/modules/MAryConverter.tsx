// Tree Algorithms Lab - Tab 2: m-ary -> BT -> BST (Pure Black/White Glass)
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
import {
  Plus,
  Trash2,
  Pencil,
  ArrowRight,
  Code2,
  MousePointerClick,
  Play,
} from "lucide-react";

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
                      ? "bg-white/20 text-white border-white/50"
                      : s.active
                      ? "bg-white/8 text-white border-white/25"
                      : "bg-transparent text-[#555555] border-white/10"
                  }`}
                  style={
                    s.done
                      ? { boxShadow: "0 0 16px rgba(255,255,255,0.15)" }
                      : undefined
                  }
                >
                  {s.n}
                </div>
                <div
                  className={`text-[11px] font-semibold uppercase ${
                    s.done ? "text-white" : "text-[#a0a0a0]"
                  }`}
                  style={{ letterSpacing: "0.15em" }}
                >
                  {s.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-white/20" />
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
            <p className="text-xs text-[#a0a0a0] mt-1">
              Draw an m-ary tree visually or paste JSON, then convert.
            </p>
          </div>

          <div className="glass-tabs flex gap-1">
            <button
              onClick={() => setMode("draw")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all ${
                mode === "draw" ? "glass-tab-active" : "text-[#666666] hover:text-white"
              }`}
            >
              <MousePointerClick className="w-3.5 h-3.5" strokeWidth={1.5} /> Draw
            </button>
            <button
              onClick={() => setMode("json")}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all ${
                mode === "json" ? "glass-tab-active" : "text-[#666666] hover:text-white"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" strokeWidth={1.5} /> JSON
            </button>
          </div>

          {mode === "draw" ? (
            <div className="space-y-3">
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
                  placeholder="e.g. A, B, 5…"
                  className="glass-input w-full px-3 py-2.5 text-sm"
                />
              </div>

              {!mary ? (
                <button
                  onClick={handleAddRoot}
                  className="glass-btn w-full px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" strokeWidth={1.5} /> Add Root
                </button>
              ) : (
                <>
                  <div className="glass-output p-3 text-xs">
                    {selectedId ? (
                      <span className="text-white/90">
                        Selected node · click others or add child
                      </span>
                    ) : (
                      <span className="text-[#555555]">
                        Click any node in the canvas to select it.
                      </span>
                    )}
                  </div>
                  <button
                    disabled={!selectedId}
                    onClick={handleAddChild}
                    className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" strokeWidth={1.5} /> Add Child to Selected
                  </button>
                  <button
                    disabled={!selectedId || !nodeValue.trim()}
                    onClick={handleRename}
                    className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /> Rename
                  </button>
                  <button
                    disabled={!selectedId}
                    onClick={handleDelete}
                    className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Delete subtree
                  </button>
                  <button
                    onClick={() => {
                      updateMary(null);
                      setSelectedId(null);
                    }}
                    className="glass-btn w-full px-3 py-2 text-xs font-semibold"
                  >
                    Clear Canvas
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <label
                className="text-[#a0a0a0] text-[10px] uppercase block"
                style={{ letterSpacing: "0.15em" }}
              >
                m-ary JSON
              </label>
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={10}
                className="glass-input w-full px-3 py-2.5 font-mono text-xs resize-y"
              />
              <button
                onClick={handleLoadJson}
                className="glass-btn w-full px-4 py-2.5 text-sm font-semibold"
              >
                Load JSON
              </button>
            </div>
          )}

          <div
            className="pt-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <button
              onClick={handleConvert}
              disabled={!mary}
              className="glass-btn w-full px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" strokeWidth={1.5} /> Run Conversion
            </button>
            {error && <div className="text-[#a0a0a0] text-xs mt-2 italic">{error}</div>}
            <div className="text-[11px] text-[#555555] mt-3">
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
            <div
              className="text-[10px] uppercase text-[#555555] mb-3"
              style={{ letterSpacing: "0.2em" }}
            >
              Inorder BEFORE (of BT)
            </div>
            <div className="flex flex-wrap gap-2">
              {beforeList.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[#e0e0e0] font-mono text-xs"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
          <div className="glass-card p-4">
            <div
              className="text-[10px] uppercase text-[#555555] mb-3"
              style={{ letterSpacing: "0.2em" }}
            >
              Inorder AFTER (of BST)
            </div>
            <div className="flex flex-wrap gap-2">
              {afterList.map((v, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white/20 border border-white/50 text-white font-mono text-xs font-semibold"
                  style={{ boxShadow: "0 0 12px rgba(255,255,255,0.12)" }}
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