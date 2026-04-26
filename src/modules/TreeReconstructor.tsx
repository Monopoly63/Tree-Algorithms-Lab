// Tree Algorithms Lab - Tab: Tree Reconstruction from two traversals
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import {
  buildFromPreIn,
  buildFromPostIn,
  parseTokens,
  traverse,
  TreeNode,
} from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Play, AlertCircle, CheckCircle2, Wand2, Info } from "lucide-react";

type Mode = "pre-in" | "post-in";

export const TreeReconstructor: React.FC = () => {
  const [mode, setMode] = useState<Mode>("pre-in");
  const [firstInput, setFirstInput] = useState("1, 2, 4, 5, 3, 6, 7");
  const [inorderInput, setInorderInput] = useState("4, 2, 5, 1, 6, 3, 7");
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [verification, setVerification] = useState<{
    preorder: string[];
    inorder: string[];
    postorder: string[];
    inputFirst: string[];
    inputInorder: string[];
  } | null>(null);

  const handleBuild = () => {
    setError(null);
    setInfo(null);
    setVerification(null);
    try {
      const firstTokens = parseTokens(firstInput);
      const inorderTokens = parseTokens(inorderInput);
      if (firstTokens.length === 0 || inorderTokens.length === 0) {
        setError("Please provide both traversals with at least one value each.");
        setTree(null);
        return;
      }
      const result =
        mode === "pre-in"
          ? buildFromPreIn(firstTokens, inorderTokens)
          : buildFromPostIn(firstTokens, inorderTokens);
      if (!result) {
        setError("Could not build tree (empty result).");
        setTree(null);
        return;
      }
      setTree(result);
      // Verification: re-run traversals from the built tree
      const pre = traverse(result, "preorder").map((s) => s.value);
      const ino = traverse(result, "inorder").map((s) => s.value);
      const post = traverse(result, "postorder").map((s) => s.value);
      setVerification({
        preorder: pre,
        inorder: ino,
        postorder: post,
        inputFirst: firstTokens,
        inputInorder: inorderTokens,
      });
      setInfo(
        `Tree reconstructed from ${firstTokens.length} nodes. Below you can verify that the traversals regenerated from the built tree match your inputs exactly.`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reconstruction failed.");
      setTree(null);
    }
  };

  const loadExample = () => {
    if (mode === "pre-in") {
      setFirstInput("1, 2, 4, 5, 3, 6, 7");
      setInorderInput("4, 2, 5, 1, 6, 3, 7");
    } else {
      setFirstInput("4, 5, 2, 6, 7, 3, 1");
      setInorderInput("4, 2, 5, 1, 6, 3, 7");
    }
    setTree(null);
    setError(null);
    setInfo(null);
    setVerification(null);
  };

  const firstLabel = mode === "pre-in" ? "Preorder" : "Postorder";
  const arraysEqual = (a: string[], b: string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 glass-card p-5 space-y-5">
        <div>
          <h2 className="text-base font-semibold text-white tracking-wide">
            Reconstruct Tree
          </h2>
          <p className="text-xs text-[#a0a0a0] mt-1">
            Rebuild a binary tree from two of its traversals. Inputs are validated
            mathematically before construction.
          </p>
        </div>

        {/* Mode switcher */}
        <div className="glass-tabs flex gap-1">
          <button
            onClick={() => setMode("pre-in")}
            className={`flex-1 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all ${
              mode === "pre-in" ? "glass-tab-active" : "text-[#666666] hover:text-white"
            }`}
          >
            Preorder + Inorder
          </button>
          <button
            onClick={() => setMode("post-in")}
            className={`flex-1 px-3 py-2 rounded-[10px] text-xs font-semibold transition-all ${
              mode === "post-in" ? "glass-tab-active" : "text-[#666666] hover:text-white"
            }`}
          >
            Postorder + Inorder
          </button>
        </div>

        <div className="space-y-2">
          <label
            className="text-[#a0a0a0] text-[10px] uppercase block"
            style={{ letterSpacing: "0.15em" }}
          >
            {firstLabel} traversal
          </label>
          <input
            type="text"
            value={firstInput}
            onChange={(e) => setFirstInput(e.target.value)}
            placeholder="e.g. 1, 2, 4, 5, 3, 6, 7"
            className="glass-input w-full px-3 py-2.5 font-mono text-sm"
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-[#a0a0a0] text-[10px] uppercase block"
            style={{ letterSpacing: "0.15em" }}
          >
            Inorder traversal
          </label>
          <input
            type="text"
            value={inorderInput}
            onChange={(e) => setInorderInput(e.target.value)}
            placeholder="e.g. 4, 2, 5, 1, 6, 3, 7"
            className="glass-input w-full px-3 py-2.5 font-mono text-sm"
          />
        </div>

        <button
          onClick={handleBuild}
          className="glass-btn w-full px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" strokeWidth={1.5} /> Reconstruct Tree
        </button>

        <button
          onClick={loadExample}
          className="glass-btn w-full px-4 py-2 text-xs font-semibold inline-flex items-center justify-center gap-2"
        >
          <Wand2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Load example
        </button>

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

        <div
          className="text-[11px] text-[#555555] pt-3 border-t space-y-1.5 leading-relaxed"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="text-[#a0a0a0] font-semibold mb-1 flex items-center gap-1.5">
            <Info className="w-3 h-3" strokeWidth={1.5} /> Notes
          </div>
          <div>• This is a general binary tree — the inorder output equals your input, and is <span className="text-white/80">not</span> sorted unless you entered a sorted sequence.</div>
          <div>• Duplicate values are rejected (ambiguous reconstruction).</div>
          <div>• Both traversals must contain the same set of values.</div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <TreeCanvas
          layout={layoutBinaryTree(tree)}
          title={tree ? "Reconstructed Tree" : "Canvas"}
          emptyHint="Provide two traversals and click Reconstruct."
        />
        {tree && verification && (
          <div className="glass-card p-5 space-y-4 font-mono text-xs animate-fade-in-up">
            <div
              className="text-[10px] uppercase text-[#555555]"
              style={{ letterSpacing: "0.2em" }}
            >
              Verification — regenerated from the built tree
            </div>

            {/* First input vs regenerated */}
            <VerifyRow
              label={firstLabel}
              regenerated={
                mode === "pre-in" ? verification.preorder : verification.postorder
              }
              input={verification.inputFirst}
              match={arraysEqual(
                mode === "pre-in" ? verification.preorder : verification.postorder,
                verification.inputFirst
              )}
            />
            {/* Inorder input vs regenerated */}
            <VerifyRow
              label="Inorder"
              regenerated={verification.inorder}
              input={verification.inputInorder}
              match={arraysEqual(verification.inorder, verification.inputInorder)}
            />

            {/* Other (derived) traversal — no input to compare */}
            <div
              className="pt-3 border-t space-y-2"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="text-[10px] uppercase text-[#555555]"
                style={{ letterSpacing: "0.2em" }}
              >
                Derived third traversal
              </div>
              <Row
                label={mode === "pre-in" ? "Postorder" : "Preorder"}
                value={
                  mode === "pre-in"
                    ? verification.postorder.join(", ")
                    : verification.preorder.join(", ")
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-3">
    <span
      className="text-[#555555] w-20 text-[10px] uppercase pt-0.5"
      style={{ letterSpacing: "0.2em" }}
    >
      {label}
    </span>
    <span className="text-[#e0e0e0] flex-1 break-all">{value}</span>
  </div>
);

const VerifyRow: React.FC<{
  label: string;
  input: string[];
  regenerated: string[];
  match: boolean;
}> = ({ label, input, regenerated, match }) => (
  <div className="space-y-1.5">
    <div className="flex items-center gap-2">
      <span
        className="text-[#555555] w-20 text-[10px] uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        {label}
      </span>
      {match ? (
        <span className="inline-flex items-center gap-1 text-[10px] text-white/90 px-2 py-0.5 rounded-full border border-white/20 bg-white/5">
          <CheckCircle2 className="w-3 h-3" strokeWidth={1.5} /> match
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] text-white/90 px-2 py-0.5 rounded-full border border-white/30 bg-white/10">
          <AlertCircle className="w-3 h-3" strokeWidth={1.5} /> differ
        </span>
      )}
    </div>
    <div className="pl-[88px] space-y-0.5">
      <div className="flex gap-2">
        <span className="text-[#555555] text-[10px] w-14">input</span>
        <span className="text-[#a0a0a0] break-all">{input.join(", ")}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-[#555555] text-[10px] w-14">built</span>
        <span className="text-white/90 break-all">{regenerated.join(", ")}</span>
      </div>
    </div>
  </div>
);