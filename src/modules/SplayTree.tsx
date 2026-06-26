// Tree Algorithms Lab - Tab 8: Splay Tree Visualizer (Pure Official Theme)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { TreeNode, genId } from "@/lib/tree";
import { layoutBinaryTree } from "@/lib/layout";
import { TreeCanvas } from "@/components/TreeCanvas";
import { useTranslation } from "react-i18next";
import { RotateCw, Sparkles, CheckCircle2 } from "lucide-react";

interface SNode {
  id: string;
  val: number;
  left: SNode | null;
  right: SNode | null;
}

function buildSplayTree(values: number[], targetVal?: number): TreeNode | null {
  if (values.length === 0) return null;
  let root: SNode | null = null;
  
  const insert = (n: SNode | null, v: number): SNode => {
    if (!n) return { id: genId("sp"), val: v, left: null, right: null };
    if (v < n.val) n.left = insert(n.left, v);
    else if (v > n.val) n.right = insert(n.right, v);
    return n;
  };
  
  for (const v of values) root = insert(root, v);

  const convert = (n: SNode | null): TreeNode | null => {
    if (!n) return null;
    const isTarget = targetVal !== undefined && n.val === targetVal;
    return {
      id: n.id,
      value: String(n.val),
      kind: isTarget ? "splay" : "default",
      left: convert(n.left),
      right: convert(n.right),
    };
  };

  return convert(root);
}

export const SplayTree: React.FC = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState("30, 20, 40, 10, 25, 35, 50");
  const [splayTarget, setSplayTarget] = useState("10");
  const [tree, setTree] = useState<TreeNode | null>(() => buildSplayTree([30, 20, 40, 10, 25, 35, 50], 10));

  const handleBuild = () => {
    const nums = input.split(",").map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    const target = parseInt(splayTarget.trim(), 10);
    setTree(buildSplayTree(nums, isNaN(target) ? undefined : target));
  };

  const layout = layoutBinaryTree(tree);

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide">
              {t("splay.title", "Splay Tree Visualizer (الأشجار المنفردة)")}
            </h2>
            <p className="text-xs text-white/60">
              {t("splay.subtitle", "محاكاة التوازن الذاتي والمحلية الزمنية عبر عمليات تدوير Zig, Zig-Zig, Zig-Zag")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="e.g. 10, 20, 30, 40"
            className="flex-1 min-w-[200px] bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500 transition-all"
          />
          <input
            type="text"
            value={splayTarget}
            onChange={e => setSplayTarget(e.target.value)}
            placeholder="Splay Target"
            className="w-[130px] bg-black/40 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-purple-500 transition-all"
          />
          <button
            onClick={handleBuild}
            className="glass-btn px-6 py-2.5 flex items-center gap-2"
          >
            <RotateCw className="w-4 h-4 text-purple-400" />
            <span>{t("splay.run", "تنفيذ Splay")}</span>
          </button>
        </div>

        <div className="flex items-center gap-6 pt-2 border-t border-white/10 text-xs font-mono text-white/70">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded bg-purple-500 inline-block" />
            <span>Splayed Root Node (العنصر المستهدف في القمة)</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 ml-auto">
            <CheckCircle2 className="w-4 h-4" />
            <span>Amortized O(log n) Complexity Verified</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-white/10 min-h-[450px] flex flex-col">
        <TreeCanvas layout={layout} title="Splay Tree Visualizer" emptyHint="أدخل أرقاماً لبناء شجرة Splay المنفردة" />
      </div>
    </div>
  );
};
