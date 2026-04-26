// Export tree as PNG / SVG / JSON
import React, { useState } from "react";
import { Download, Image as ImageIcon, FileCode, FileJson } from "lucide-react";
import { toPng, toSvg } from "html-to-image";
import { TreeNode } from "@/lib/tree";
import { useTranslation } from "react-i18next";

interface ExportTreeProps {
  /** The DOM node to export as image (canvas container). */
  target?: HTMLElement | null;
  /** The tree object to export as JSON. */
  tree?: TreeNode | null;
  /** Base filename (no extension). */
  filename?: string;
}

const serializeTree = (node: TreeNode | null): unknown => {
  if (!node) return null;
  const shape = node as unknown as Record<string, unknown>;
  return {
    value: shape.value,
    left: serializeTree((shape.left as TreeNode) || null),
    right: serializeTree((shape.right as TreeNode) || null),
  };
};

const downloadBlob = (data: string, filename: string, mime: string) => {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const downloadDataURL = (dataUrl: string, filename: string) => {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const ExportTree: React.FC<ExportTreeProps> = ({
  target,
  tree,
  filename = "tree",
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<null | "png" | "svg" | "json">(null);

  const exportPng = async () => {
    if (!target) return;
    setBusy("png");
    try {
      const dataUrl = await toPng(target, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "transparent",
      });
      downloadDataURL(dataUrl, `${filename}.png`);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(null);
      setOpen(false);
    }
  };

  const exportSvg = async () => {
    if (!target) return;
    setBusy("svg");
    try {
      const dataUrl = await toSvg(target, { cacheBust: true });
      downloadDataURL(dataUrl, `${filename}.svg`);
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(null);
      setOpen(false);
    }
  };

  const exportJson = () => {
    setBusy("json");
    try {
      const json = JSON.stringify(serializeTree(tree ?? null), null, 2);
      downloadBlob(json, `${filename}.json`, "application/json");
    } finally {
      setBusy(null);
      setOpen(false);
    }
  };

  const disabled = !target && !tree;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        className="glass-btn px-3 py-2 text-xs font-semibold inline-flex items-center gap-2 disabled:opacity-40"
        title={t("actions.export")}
      >
        <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>{t("actions.export")}</span>
      </button>
      {open && (
        <div
          className="absolute z-40 mt-2 end-0 w-44 glass-card p-1.5 animate-fade-in-up"
          style={{ borderRadius: "12px" }}
        >
          <button
            onClick={exportPng}
            disabled={!target || busy !== null}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/90 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-40"
          >
            <ImageIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t("actions.exportPng")}
          </button>
          <button
            onClick={exportSvg}
            disabled={!target || busy !== null}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/90 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-40"
          >
            <FileCode className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t("actions.exportSvg")}
          </button>
          <button
            onClick={exportJson}
            disabled={!tree || busy !== null}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/90 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-40"
          >
            <FileJson className="w-3.5 h-3.5" strokeWidth={1.5} />
            {t("actions.exportJson")}
          </button>
        </div>
      )}
    </div>
  );
};