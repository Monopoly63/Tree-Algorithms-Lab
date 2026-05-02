// Tree Algorithms Lab - AVL Fixer (Step-by-step balancing animation)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  AVLNode,
  buildUnbalancedBST,
  findImbalancedNodes,
  avlFixStep,
  toTreeNode,
  collectBalanceInfo,
  clearRotationSteps,
  RotationStep,
  NodeBalanceInfo,
} from "@/lib/avl";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  History,
  Wrench,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export const AVLFixer: React.FC = () => {
  const { t } = useTranslation();
  const [root, setRoot] = useState<AVLNode | null>(null);
  const [buildInput, setBuildInput] = useState("50,30,70,20,10,5");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [fixLog, setFixLog] = useState<RotationStep[]>([]);
  const [balanceInfo, setBalanceInfo] = useState<NodeBalanceInfo[]>([]);
  const [imbalancedIds, setImbalancedIds] = useState<Set<string>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBalanced, setIsBalanced] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const flashError = (msg: string) => {
    setError(msg);
    setInfo(null);
    window.setTimeout(() => setError((e) => (e === msg ? null : e)), 3500);
  };

  const flashInfo = (msg: string) => {
    setInfo(msg);
    setError(null);
    window.setTimeout(() => setInfo((i) => (i === msg ? null : i)), 3000);
  };

  const updateTreeState = useCallback((newRoot: AVLNode | null) => {
    setRoot(newRoot);
    setBalanceInfo(collectBalanceInfo(newRoot));
    const ids = findImbalancedNodes(newRoot);
    setImbalancedIds(new Set(ids));
    setIsBalanced(ids.length === 0 && newRoot !== null);
  }, []);

  const handleBuild = () => {
    setError(null);
    setFixLog([]);
    setIsBalanced(false);
    stopPlay();
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
      const newRoot = buildUnbalancedBST(values);
      updateTreeState(newRoot);
      flashInfo(
        `Unbalanced BST built from ${values.length} value${values.length > 1 ? "s" : ""}.`
      );
    } catch (e) {
      flashError(e instanceof Error ? e.message : "Failed to build BST");
    }
  };

  const handleNextStep = useCallback(() => {
    if (!root) return;
    clearRotationSteps();
    const result = avlFixStep(root);
    if (!result) {
      setIsBalanced(true);
      setImbalancedIds(new Set());
      stopPlay();
      flashInfo(t("avlFixer.balanced"));
      return;
    }
    setFixLog((prev) => [...prev, result.step]);
    updateTreeState(result.newRoot);
  }, [root, updateTreeState, t]);

  const stopPlay = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handlePlay = () => {
    if (isPlaying) {
      stopPlay();
      return;
    }
    if (!root || isBalanced) return;
    setIsPlaying(true);
  };

  // Auto-step effect
  useEffect(() => {
    if (isPlaying && root && !isBalanced) {
      intervalRef.current = setInterval(() => {
        clearRotationSteps();
        setRoot((currentRoot) => {
          if (!currentRoot) {
            stopPlay();
            return currentRoot;
          }
          const result = avlFixStep(currentRoot);
          if (!result) {
            setIsBalanced(true);
            setImbalancedIds(new Set());
            stopPlay();
            return currentRoot;
          }
          setFixLog((prev) => [...prev, result.step]);
          const ids = findImbalancedNodes(result.newRoot);
          setImbalancedIds(new Set(ids));
          setBalanceInfo(collectBalanceInfo(result.newRoot));
          if (ids.length === 0) {
            setIsBalanced(true);
            stopPlay();
          }
          return result.newRoot;
        });
      }, 1500);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, isBalanced]);

  const handleReset = () => {
    stopPlay();
    setRoot(null);
    setBalanceInfo([]);
    setImbalancedIds(new Set());
    setFixLog([]);
    setIsBalanced(false);
    setError(null);
    setInfo(null);
  };

  const treeNode = toTreeNode(root);
  const layout = layoutBinaryTree(treeNode);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {/* ─── Left Panel ─── */}
      <div className="lg:col-span-1 space-y-4">
        {/* Build Section */}
        <div className="glass-card p-5 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-white tracking-wide inline-flex items-center gap-2">
              <Wrench className="w-4 h-4" strokeWidth={1.5} />
              {t("avlFixer.fixer")}
            </h2>
            <p className="text-xs text-[#a0a0a0] mt-1">
              {t("avlFixer.fixerDesc")}
            </p>
          </div>

          {/* Build unbalanced BST */}
          <div className="space-y-2">
            <label
              className="text-[#a0a0a0] text-[10px] uppercase block"
              style={{ letterSpacing: "0.15em" }}
            >
              {t("avlFixer.buildUnbalanced")}
            </label>
            <input
              type="text"
              value={buildInput}
              onChange={(e) => setBuildInput(e.target.value)}
              placeholder="50,30,70,20,10,5"
              className="glass-input w-full px-3 py-2.5 text-sm"
            />
            <button
              onClick={handleBuild}
              className="glass-btn w-full px-4 py-2.5 text-sm font-semibold"
            >
              {t("avlFixer.buildUnbalanced")}
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-2">
            <label
              className="text-[#a0a0a0] text-[10px] uppercase block"
              style={{ letterSpacing: "0.15em" }}
            >
              {t("avlFixer.mode")} — Fix Controls
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleNextStep}
                disabled={!root || isBalanced}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
              >
                <SkipForward className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("avlFixer.nextStep")}
              </button>
              <button
                onClick={handlePlay}
                disabled={!root || isBalanced}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t("avlFixer.pause")}
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                    {t("avlFixer.play")}
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                {t("avlFixer.reset")}
              </button>
            </div>
          </div>

          {/* Balanced indicator */}
          {isBalanced && (
            <div className="glass-output p-3 text-xs flex items-start gap-2 border border-white/10">
              <CheckCircle2
                className="w-4 h-4 text-white/80 shrink-0 mt-0.5"
                strokeWidth={1.5}
              />
              <span className="text-white/90 leading-relaxed font-semibold">
                {t("avlFixer.balanced")}
              </span>
            </div>
          )}

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
          {info && !error && !isBalanced && (
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
                  className={`glass-output p-2 text-center rounded-lg ${
                    Math.abs(n.balanceFactor) > 1
                      ? "ring-1 ring-white/40"
                      : ""
                  }`}
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

        {/* Fix History */}
        {fixLog.length > 0 && (
          <div className="glass-card p-4 space-y-3">
            <h3
              className="text-[10px] uppercase text-[#a0a0a0] font-semibold inline-flex items-center gap-1.5"
              style={{ letterSpacing: "0.15em" }}
            >
              <History className="w-3.5 h-3.5" strokeWidth={1.5} />
              Fix History
            </h3>
            <div className="space-y-1.5 max-h-40 overflow-y-auto">
              {fixLog.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-output p-2 text-xs flex items-start gap-2"
                >
                  <span className="text-white/60 font-mono text-[10px] shrink-0 mt-0.5">
                    {t("avlFixer.stepN")} {idx + 1}
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
          title={
            root
              ? isBalanced
                ? "✓ Balanced AVL Tree"
                : "Unbalanced BST → Fixing..."
              : "Canvas"
          }
          highlightedIds={imbalancedIds.size > 0 ? imbalancedIds : undefined}
          emptyHint="Build an unbalanced BST to start fixing."
        />
      </div>
    </div>
  );
};