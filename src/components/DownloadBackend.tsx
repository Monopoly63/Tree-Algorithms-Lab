// Tree Algorithms Lab - Download Backend as ZIP (Pure Glass)
// Student: Abdulmoin Hablas | Course: Algorithms 3
import React, { useState } from "react";
import { BACKEND_FILES } from "@/lib/backendFiles";
import { Download } from "lucide-react";

// Minimal STORE-only ZIP builder (no compression) — avoids extra deps
function crc32(data: Uint8Array): number {
  let c;
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = (crc >>> 8) ^ table[(crc ^ data[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function writeUInt32LE(buf: number[], val: number) {
  buf.push(val & 0xff, (val >>> 8) & 0xff, (val >>> 16) & 0xff, (val >>> 24) & 0xff);
}
function writeUInt16LE(buf: number[], val: number) {
  buf.push(val & 0xff, (val >>> 8) & 0xff);
}

function buildZip(files: Record<string, string>): Uint8Array {
  const localParts: number[] = [];
  const centralParts: number[] = [];
  let offset = 0;
  const encoder = new TextEncoder();
  const entries: { name: string; data: Uint8Array; crc: number; offset: number }[] = [];

  for (const [name, content] of Object.entries(files)) {
    const data = encoder.encode(content);
    const nameBytes = encoder.encode(name);
    const crc = crc32(data);
    const entryOffset = offset;

    writeUInt32LE(localParts, 0x04034b50);
    writeUInt16LE(localParts, 20);
    writeUInt16LE(localParts, 0);
    writeUInt16LE(localParts, 0);
    writeUInt16LE(localParts, 0);
    writeUInt16LE(localParts, 0);
    writeUInt32LE(localParts, crc);
    writeUInt32LE(localParts, data.length);
    writeUInt32LE(localParts, data.length);
    writeUInt16LE(localParts, nameBytes.length);
    writeUInt16LE(localParts, 0);
    for (const b of nameBytes) localParts.push(b);
    for (const b of data) localParts.push(b);
    offset = localParts.length;

    entries.push({ name, data, crc, offset: entryOffset });
  }

  const centralStart = localParts.length;
  for (const e of entries) {
    const nameBytes = encoder.encode(e.name);
    writeUInt32LE(centralParts, 0x02014b50);
    writeUInt16LE(centralParts, 20);
    writeUInt16LE(centralParts, 20);
    writeUInt16LE(centralParts, 0);
    writeUInt16LE(centralParts, 0);
    writeUInt16LE(centralParts, 0);
    writeUInt16LE(centralParts, 0);
    writeUInt32LE(centralParts, e.crc);
    writeUInt32LE(centralParts, e.data.length);
    writeUInt32LE(centralParts, e.data.length);
    writeUInt16LE(centralParts, nameBytes.length);
    writeUInt16LE(centralParts, 0);
    writeUInt16LE(centralParts, 0);
    writeUInt16LE(centralParts, 0);
    writeUInt16LE(centralParts, 0);
    writeUInt32LE(centralParts, 0);
    writeUInt32LE(centralParts, e.offset);
    for (const b of nameBytes) centralParts.push(b);
  }

  const centralSize = centralParts.length;
  const end: number[] = [];
  writeUInt32LE(end, 0x06054b50);
  writeUInt16LE(end, 0);
  writeUInt16LE(end, 0);
  writeUInt16LE(end, entries.length);
  writeUInt16LE(end, entries.length);
  writeUInt32LE(end, centralSize);
  writeUInt32LE(end, centralStart);
  writeUInt16LE(end, 0);

  const total = new Uint8Array(localParts.length + centralParts.length + end.length);
  total.set(localParts, 0);
  total.set(centralParts, localParts.length);
  total.set(end, localParts.length + centralParts.length);
  return total;
}

export const DownloadBackend: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    try {
      const zipData = buildZip(BACKEND_FILES);
      const blob = new Blob([zipData], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "tree-algorithms-lab-backend.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="glass-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wide"
    >
      <Download className="w-4 h-4" strokeWidth={1.5} />
      <span className="hidden sm:inline">Download Backend (ZIP)</span>
      <span className="sm:hidden">Backend ZIP</span>
    </button>
  );
};