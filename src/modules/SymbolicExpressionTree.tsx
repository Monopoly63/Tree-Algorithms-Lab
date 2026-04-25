// Tree Algorithms Lab - Tab 5: Symbolic Expression Tree
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { buildExpressionTree, prefixOf, postfixOf, infixOf, TreeNode } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    } catch (e: any) {
      setError(e.message || "Failed to parse expression");
      setTree(null);
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-3">
        <h2 className="text-lg font-semibold text-slate-100">Symbolic Expression Tree</h2>
        <Label className="text-slate-300">Symbolic expression</Label>
        <Input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          placeholder="(a+b)*(c-d)"
          className="bg-slate-900 border-slate-700 text-slate-100 font-mono"
        />
        <Button onClick={handleBuild} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Parse &amp; Build
        </Button>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div className="text-xs text-slate-400 pt-2 border-t border-slate-700 space-y-1">
          <div><span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-2"></span>Operators</div>
          <div><span className="inline-block w-3 h-3 rounded-full bg-teal-500 mr-2"></span>Operands</div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        <TreeCanvas layout={layoutBinaryTree(tree)} title="Symbolic Expression Tree" />
        {tree && (
          <div className="bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-2 font-mono text-sm">
            <div className="text-slate-300"><span className="text-slate-500 w-20 inline-block">Inorder:</span>{inorder}</div>
            <div className="text-slate-300"><span className="text-slate-500 w-20 inline-block">Prefix:</span>{prefix}</div>
            <div className="text-slate-300"><span className="text-slate-500 w-20 inline-block">Postfix:</span>{postfix}</div>
          </div>
        )}
      </div>
    </div>
  );
};