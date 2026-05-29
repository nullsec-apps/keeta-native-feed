import React from 'react';

export function highlightText(text: string): React.ReactNode[] {
  const parts = text.split(/(\s+)/);
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return React.createElement('a', { key: i, href: part, target: '_blank', rel: 'noreferrer', className: 'text-[#00E599] underline underline-offset-2 break-all hover:text-[#00E599]/80 transition-colors' }, part.length > 30 ? part.slice(0, 30) + '…' : part);
    }
    if (/^\$[A-Za-z]+/.test(part)) return React.createElement('span', { key: i, className: 'text-[#00E599] font-semibold' }, part);
    if (/^#[A-Za-z0-9_]+/.test(part)) return React.createElement('span', { key: i, className: 'text-[#00E599]' }, part);
    if (/^@[A-Za-z0-9_]+/.test(part)) return React.createElement('span', { key: i, className: 'text-[#00E599]/80' }, part);
    return part;
  });
}