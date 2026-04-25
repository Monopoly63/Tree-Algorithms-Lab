// Tree Algorithms Lab - Tab 4: Numeric Expression Tree (Pure Black/White Glass)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import {
  buildExpressionTree,
  prefixOf,
  postfixOf,
  infixOf,
  evaluateTree,
  TreeNode,
} from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Play } from "lucide-react";

export const NumericExpressionTree: React.FC = () => {
  const [expr, setExpr] = useState("((2+4)*(8-3))/5");
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [prefix, setPrefix] = useState("");
  const [postfix, setPostfix] = useState("");
  const [inorder, setInorder] = useState("");
  const [value, setValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBuild = () => {
    setError(null);
    try {
      const t = buildExpressionTree(expr);
      setTree(t);
      setPrefix(prefixOf(t));
      setPostfix(postfixOf(t));
      setInorder(infixOf(t));
      setValue(evaluateTree(t));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse expression");
      setTree(null);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 glass-card p-5 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Numeric Expression Tree</h2>
          <p className="text-xs text-[#a0a0a0] mt-1">
            Shunting-Yard parser + full evaluation.
          </p>
        </div>
        <label
          className="text-[#a0a0a0] text-[10px] uppercase block"
          style={{ letterSpacing: "0.15em" }}
        >
          Infix expression
        </label>
        <input
          type="text"
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="((2+4)*(8-3))/5"
          className="glass-input w-full px-3 py-2.5 font-mono text-sm"
        />
        <button
          onClick={handleBuild}
          className="glass-btn w-full px-4 py-2.5 text-sm font-semibold inline-flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" strokeWidth={1.5} /> Parse &amp; Build
        </button>
        {error && <div className="text-[#a0a0a0] text-xs italic">{error}</div>}
        <div
          className="text-[11px] text-[#555555] pt-3 border-t space-y-2"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{
                background: "rgba(200,200,200,0.1)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            />
            <span className="text-[#a0a0a0]">Operators</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            />
            <span className="text-[#a0a0a0]">Operands</span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <TreeCanvas layout={layoutBinaryTree(tree)} title="Expression Tree" />
        {tree && (
          <div className="glass-card p-5 space-y-3 font-mono text-xs animate-fade-in-up">
            <Row label="Inorder" value={inorder} />
            <Row label="Prefix" value={prefix} />
            <Row label="Postfix" value={postfix} />
            <div
              className="flex items-center pt-3 mt-1 border-t"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span
                className="text-[#555555] w-20 text-[10px] uppercase"
                style={{ letterSpacing: "0.2em" }}
              >
                Value
              </span>
              <span
                className="text-white text-2xl font-bold"
                style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}
              >
                {value}
              </span>
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