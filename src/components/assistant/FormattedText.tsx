"use client";

import React from "react";

interface FormattedTextProps {
  text: string;
}

export function FormattedText({ text }: FormattedTextProps) {
  if (!text) return null;

  // Split into paragraphs/blocks
  const blocks = text.split("\n\n");

  return (
    <div className="space-y-3 text-xs leading-relaxed">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();

        // Header 3: ### Header
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={bIdx} className="text-sm font-bold text-text-primary pt-1 pb-0.5 border-b border-border/60">
              {trimmed.replace("### ", "")}
            </h3>
          );
        }

        // Bullet lists: - item or 1. item
        if (trimmed.includes("\n- ") || trimmed.startsWith("- ") || trimmed.includes("\n1. ")) {
          const lines = trimmed.split("\n");
          return (
            <ul key={bIdx} className="space-y-1.5 pl-1">
              {lines.map((line, lIdx) => {
                const isBullet = line.trim().startsWith("- ") || /^\d+\.\s/.test(line.trim());
                if (!isBullet) {
                  return (
                    <p key={lIdx} className="text-text-primary font-semibold">
                      {formatInlineBold(line)}
                    </p>
                  );
                }
                const content = line.trim().replace(/^(-\s*|\d+\.\s*)/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-2 text-text-primary">
                    <span className="text-primary font-bold mt-0.5">•</span>
                    <div>{formatInlineBold(content)}</div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Standard Paragraph
        return (
          <p key={bIdx} className="text-text-primary">
            {formatInlineBold(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

function formatInlineBold(str: string) {
  const parts = str.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-text-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-text-secondary">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}
