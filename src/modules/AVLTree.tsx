// Tree Algorithms Lab - Tab 7: AVL Tree (Pure Black/White Glass)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState, useCallback } from "react";
import {
  AVLNode,
  avlInsert,
  avlDelete,
  avlSearch,
  buildAVL,
  toTreeNode,
  collectBalanceInfo,
  getRotationSteps,
  clearRotationSteps,
  RotationStep,
  NodeBalanceInfo,
} from "@/lib/avl";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { AVLFixer } from "@/modules/AVLFixer";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Trash2,
  Search,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  History,
  Hammer,
  TreeDeciduous,
} from "lucide-react";

type AVLMode = "builder" | "fixer";

export const AVLTree: React.FC = () => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<AVLMode>("builder");
  const [avlRoot, setAvlRoot] = useState<AVLNode | null>(null);
  const [buildInput, setBuildInput] = useState("30,20,40,10,25,35,50");
  const [singleInput, setSingleInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [rotationLog, setRotationLog] = useState<RotationStep[]>([]);
  const [balanceInfo, setBalanceInfo] = useState<NodeBalanceInfo[]>([]);
  const [highlightedIds, setHighlightedIds] = useState<Set<string>>(new Set());

  const flashError = (msg: string) => {
    setError(msg);
    setInfo(null);
    window.setTimeout(() => setError((e) => (e === msg ? null : e)), 3500);
  };

  const flashInfo = (msg: string) => {
    setInfo(msg);
    setError(null);
    window.setTimeout(() => setInfo((i) => (i === msg ? null : i)), 2500);
  };

  const updateState = useCallback((root: AVLNode | null) => {
    setAvlRoot(root);
    setBalanceInfo(collectBalanceInfo(root));
    setRotationLog((prev) => [...prev, ...getRotationSteps()]);
    setHighlightedIds(new Set());
  }, []);

  const handleBuild = () => {
    setError(null);
    setRotationLog([]);
    try {
      const values = buildInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => {
          const n = Number(s);
          if (isNaN(n)) throw new Error(`Invalid number: ${s}`);
          return n;
        });
      if (values.length === 0) {
        flashError("Please enter at least one number.");
        return;
      }
      clearRotationSteps();
      const root = buildAVL(values);
      updateState(root);
      flashInfo(
        `AVL tree built from ${values.length} value${values.length > 1 ? "s" : ""}.`
      );
    } catch (e) {
      flashError(e instanceof Error ? e.message : "Failed to build AVL tree");
    }
  };

  const handleInsert = () => {
    setError(null);
    const raw = singleInput.trim();
    if (!raw) {
      flashError("Please enter a value to insert.");
      return;
    }
    const val = Number(raw);
    if (isNaN(val)) {
      flashError("AVL tree only accepts numeric values.");
      return;
    }
    clearRotationSteps();
    const newRoot = avlInsert(avlRoot, val);
    updateState(newRoot);
    setSingleInput("");
    flashInfo(`Inserted ${val} into AVL tree.`);
  };

  const handleDelete = () => {
    setError(null);
    const raw = singleInput.trim();
    if (!raw) {
      flashError("Please enter a value to delete.");
      return;
    }
    const val = Number(raw);
    if (isNaN(val)) {
      flashError("AVL tree only accepts numeric values.");
      return;
    }
    if (!avlSearch(avlRoot, val)) {
      flashError(`Value ${val} not found in the tree.`);
      return;
    }
    clearRotationSteps();
    const newRoot = avlDelete(avlRoot, val);
    updateState(newRoot);
    setSingleInput("");
    flashInfo(`Deleted ${val} from AVL tree.`);
  };

  const handleSearch = () => {
    setError(null);
    const raw = singleInput.trim();
    if (!raw) {
      flashError("Please enter a value to search.");
      return;
    }
    const val = Number(raw);
    if (isNaN(val)) {
      flashError("AVL tree only accepts numeric values.");
      return;
    }
    const found = avlSearch(avlRoot, val);
    if (found) {
      setHighlightedIds(new Set([found.id]));
      flashInfo(`Found ${val} in the AVL tree.`);
    } else {
      setHighlightedIds(new Set());
      flashError(`Value ${val} not found in the tree.`);
    }
  };

  const handleClear = () => {
    setAvlRoot(null);
    setBalanceInfo([]);
    setRotationLog([]);
    setHighlightedIds(new Set());
    setError(null);
    setInfo(null);
  };

  const handleClearLog = () => {
    setRotationLog([]);
  };

  const treeNode = toTreeNode(avlRoot);
  const layout = layoutBinaryTree(treeNode);

  return (
    <div className="space-y-4">
      {/* ─── Mode Toggle ─── */}
      <div className="glass-card p-3 flex items-center gap-3">
        <span className="text-[10px] uppercase text-[#a0a0a0] font-semibold" style={{ letterSpacing: "0.15em" }}>
          {t("avlFixer.mode")}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => setMode("builder")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-all ${
              mode === "builder"
                ? "bg-white/15 text-white border border-white/20"
                : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
            }`}
          >
            <TreeDeciduous className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t("avlFixer.builder")}
          </button>
          <button
            onClick={() => setMode("fixer")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md inline-flex items-center gap-1.5 transition-all ${
              mode === "fixer"
                ? "bg-white/15 text-white border border-white/20"
                : "text-[#a0a0a0] hover:text-white hover:bg-white/5"
            }`}
          >
            <Hammer className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t("avlFixer.fixer")}
          </button>
        </div>
      </div>

      {/* ─── Fixer Mode ─── */}
      {mode === "fixer" && <AVLFixer />}

      {/* ─── Builder Mode ─── */}
      {mode === "builder" && (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* ─── Left Panel ─── */}
      <div className="lg:col-span-1 space-y-4">
        {/* Build Section */}
        <div className="glass-card p-5 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-white tracking-wide">
              AVL Tree
            </h2>
            <p className="text-xs text-[#a0a0a0] mt-1">
              Self-balancing BST with automatic rotations. Balance factor ∈
              {" {-1, 0, 1}"}.
            </p>
          </div>

          {/* Build from list */}
          <div className="space-y-2">
            <label
              className="text-[#a0a0a0] text-[10px] uppercase block"
              style={{ letterSpacing: "0.15em" }}
            >
              Build from values (comma-separated)
            </label>
            <input
              type="text"
              value={buildInput}
              onChange={(e) => setBuildInput(e.target.value)}
              placeholder="30,20,40,10,25"
              className="glass-input w-full px-3 py-2.5 text-sm"
            />
            <button
              onClick={handleBuild}
              className="glass-btn w-full px-4 py-2.5 text-sm font-semibold"
            >
              Build AVL Tree
            </button>
          </div>

          {/* Single value operations */}
          <div className="space-y-2">
            <label
              className="text-[#a0a0a0] text-[10px] uppercase block"
              style={{ letterSpacing: "0.15em" }}
            >
              Single value operation
            </label>
            <input
              type="text"
              value={singleInput}
              onChange={(e) => setSingleInput(e.target.value)}
              placeholder="e.g. 15"
              className="glass-input w-full px-3 py-2.5 text-sm"
              inputMode="numeric"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleInsert();
              }}
            />
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleInsert}
                disabled={!singleInput.trim()}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} /> Insert
              </button>
              <button
                onClick={handleDelete}
                disabled={!singleInput.trim() || !avlRoot}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Delete
              </button>
              <button
                onClick={handleSearch}
                disabled={!singleInput.trim() || !avlRoot}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
              >
                <Search className="w-3.5 h-3.5" strokeWidth={1.5} /> Search
              </button>
            </div>
            <button
              onClick={handleClear}
              className="glass-btn w-full px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} /> Clear
              Canvas
            </button>
          </div>

          {/* Feedback */}
          {error && (
            <div className="glass-output p-3 text-xs flex items-start gap-2 border border-white/10">
              <AlertCircle
                className="w-4 h-4 text-white/80 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <span className="text-white/90 leading-relaxed">{error}</span>
            </div>
          )}
          {info && !error && (
            <div className="glass-output p-3 text-xs flex items-start gap-2 border border-white/10">
              <CheckCircle2
                className="w-4 h-4 text-white/80 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <span className="text-white/90 leading-relaxed">{info}</span>
            </div>
          )}
        </div>

        {/* Balance Factor Panel */}
        {balanceInfo.length > 0 && (
          <div className="glass-card p-4 space-y-3">
            <h3
              className="text-[10px] uppercase text-[#a0a0a0] font-semibold"
              style={{ letterSpacing: "0.15em" }}
            >
              Balance Factors
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {balanceInfo.map((n) => (
                <div
                  key={n.id}
                  className="glass-output p-2 text-center rounded-lg"
                >
                  <div className="text-white text-sm font-mono font-bold">
                    {n.value}
                  </div>
                  <div
                    className={`text-[10px] font-semibold mt-0.5 ${
                      n.balanceFactor === 0
                        ? "text-[#a0a0a0]"
                        : Math.abs(n.balanceFactor) === 1
                          ? "text-white/70"
                          : "text-white"
                    }`}
                  >
                    BF: {n.balanceFactor > 0 ? "+" : ""}
                    {n.balanceFactor}
                  </div>
                  <div className="text-[9px] text-[#555555]">h={n.height}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rotation History */}
        {rotationLog.length > 0 && (
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3
                className="text-[10px] uppercase text-[#a0a0a0] font-semibold inline-flex items-center gap-1.5"
                style={{ letterSpacing: "0.15em" }}
              >
                <History className="w-3.5 h-3.5" strokeWidth={1.5} />
                Rotation History
              </h3>
              <button
                onClick={handleClearLog}
                className="text-[10px] text-[#555555] hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {rotationLog.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-output p-2 text-xs flex items-start gap-2"
                >
                  <span className="text-white/60 font-mono text-[10px] shrink-0 mt-0.5">
                    #{idx + 1}
                  </span>
                  <span className="text-white/80 font-semibold shrink-0">
                    {step.type}
                  </span>
                  <span className="text-[#a0a0a0] leading-relaxed">
                    {step.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Right Panel (Canvas) ─── */}
      <div className="lg:col-span-2">
        <TreeCanvas
          layout={layout}
          title={avlRoot ? "AVL Tree Visualization" : "Canvas"}
          highlightedIds={highlightedIds.size > 0 ? highlightedIds : undefined}
          emptyHint="Build an AVL tree to see it here."
        />
      </div>
    </div>
      )}
    </div>
  );
};