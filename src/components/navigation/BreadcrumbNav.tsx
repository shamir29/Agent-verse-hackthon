"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatLabel = (segment: string) => {
    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-tertiary mb-4">
      <Link href="/" className="flex items-center gap-1 hover:text-text-primary transition-colors">
        <Home className="w-3.5 h-3.5 text-primary" />
        <span>Console</span>
      </Link>
      {segments.length > 0 && <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />}

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <React.Fragment key={href}>
            {isLast ? (
              <span className="font-semibold text-text-primary capitalize">{formatLabel(segment)}</span>
            ) : (
              <Link href={href} className="hover:text-text-primary transition-colors capitalize">
                {formatLabel(segment)}
              </Link>
            )}
            {!isLast && <ChevronRight className="w-3.5 h-3.5 text-text-tertiary" />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
