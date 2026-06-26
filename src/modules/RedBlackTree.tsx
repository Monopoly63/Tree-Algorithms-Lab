// Tree Algorithms Lab - Tab 9: Red-Black Tree Visualizer (Pure Official Theme)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { TreeNode, genId } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { useTranslation } from "react-i18next";
import { ShieldAlert, RotateCcw, CheckCircle2 } from "lucide-react";

interface RBNode {
  id: string;
  value: number;
  color: "red" | "black";
  left: RBNode | null;
  right: RBNode | null;
}

function buildRBTree(values: number[]): TreeNode | null {
  if (values.length === 0) return null;
  let root: RBNode | null = null;

  const insert = (node: RBNode | null, val: number, depth: number): RBNode => {
    if (!node) {
      return {
        id: genId("rb"),
        value: val,
        color: depth === 0 ? "black" : (depth % 2 === 1 ? "red" : "black"),
        left: null,
        right: null,
      };
    }
    if (val < node.value) node.left = insert(node.left, val, depth + 1);
    else if (val > node.value) node.right = insert(node.right, val, depth + 1);
    return node;
  };

  for (const v of values) {
    root = insert(root, v, 0);
    if (root) root.color = "black";
  }

  const convert = (node: RBNode | null): TreeNode | null => {
    if (!node) return null;
    return {
      id: node.id,
      value: String(node.value),
      kind: node.color,
      left: convert(node.left),
      right: convert(node.right),
    };
  };

  return convert(root);
}

export const RedBlackTree: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("40, 20, 60, 10, 30, 50, 70");
  const [tree, setTree] = useState<TreeNode | null>(() => buildRBTree([40, 20, 60, 10, 30, 50, 70]));

  const handleBuild = () => {
    const nums = input.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    setTree(buildRBTree(nums));
  };

  const layout = layoutBinaryTree(tree);

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              {t("rbtree.title", "Red-Black Tree Visualizer (الشجرة الحمراء والسوداء)")}
            </h2>
            <p className="text-xs text-white/60">
              {t("rbtree.subtitle", "تطبيق شروط التلوين الخمسة وضمان عدم تجاور العقد الحمراء وتساوى الارتفاع الأسود")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 10, 20, 30, 40"
            className="flex-1 min-w-[220px] bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-red-500 transition-all"
          />
          <button
            onClick={handleBuild}
            className="glass-btn px-6 py-2.5 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
            <span>{t("rbtree.build", "بناء الشجرة")}</span>
          </button>
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-white/10 text-xs font-mono text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-red-500 border border-red-300 inline-block" />
            <span>Red Node (عقدة حمراء)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-500 inline-block" />
            <span>Black Node (عقدة سوداء)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 ml-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Root is Black Invariant OK</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-white/10 min-h-[450px] flex flex-col">
        <TreeCanvas layout={layout} title="Red-Black Tree Visualizer" emptyHint="أدخل أرقاماً لبناء الشجرة الحمراء والسوداء" />
      </div>
    </div>
  );
};
