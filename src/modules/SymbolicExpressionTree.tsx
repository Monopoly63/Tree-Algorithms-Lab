// Tree Algorithms Lab - Tab 5: Symbolic Expression Tree (glass theme)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { buildExpressionTree, prefixOf, postfixOf, infixOf, TreeNode } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play } from "lucide-react";

export const SymbolicExpressionTree: React.FC = () => {
  const [expr, setExpr] = useState("(a+b)*(c-d)");
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [prefix, setPrefix] = useState("");
  const [postfix, setPostfix] = useState("");
  const [inorder, setInorder] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleBuild = () => {
    setError(null);
    try {
      const t = buildExpressionTree(expr);
      setTree(t);
      setPrefix(prefixOf(t));
      setPostfix(postfixOf(t));
      setInorder(infixOf(t));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to parse expression");
      setTree(null);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-1 glass-card p-5 space-y-4">
        <div>
          <h2 className="text-base font-semibold text-white">Symbolic Expression Tree</h2>
          <p className="text-xs text-white/50 mt-1">
            Works with variables and any algebraic expression.
          </p>
        </div>
        <Label className="text-white/80 text-xs uppercase tracking-wider">
          Symbolic expression
        </Label>
        <Input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="(a+b)*(c-d)"
          className="bg-black/40 border-white/15 text-white placeholder:text-white/30 font-mono"
        />
        <Button
          onClick={handleBuild}
          className="w-full bg-white text-black hover:bg-white/90 font-semibold gap-2"
        >
          <Play className="w-4 h-4" /> Parse &amp; Build
        </Button>
        {error && <div className="text-red-400 text-xs">{error}</div>}
        <div className="text-[11px] text-white/50 pt-3 border-t border-white/10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-white/80 border border-white/60" />
            Operators
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-white/20 border border-white/30" />
            Operands / Variables
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <TreeCanvas layout={layoutBinaryTree(tree)} title="Symbolic Expression Tree" />
        {tree && (
          <div className="glass-card p-4 space-y-2.5 font-mono text-xs animate-fade-in-up">
            <Row label="Inorder" value={inorder} />
            <Row label="Prefix" value={prefix} />
            <Row label="Postfix" value={postfix} />
          </div>
        )}
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-3">
    <span className="text-white/50 w-20 text-[11px] uppercase tracking-wider pt-0.5">
      {label}
    </span>
    <span className="text-white/90 flex-1 break-all">{value}</span>
  </div>
);