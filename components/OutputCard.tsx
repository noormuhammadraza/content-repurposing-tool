'use client';

import { useState } from 'react';
import type { Platform } from '@/types';

const PLATFORM_LABELS: Record<Platform, string> = {
  twitter: 'Twitter / X',
  linkedin: 'LinkedIn',
  email: 'Email',
  instagram: 'Instagram',
  youtube: 'YouTube Shorts',
};

export default function OutputCard({ platform, content }: { platform: Platform; content: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent failure — don't set copied to true
    }
  }

  return (
    <div className="border border-neutral-200 rounded-xl p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-neutral-800">
          {PLATFORM_LABELS[platform]}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy content"
          className={`
            text-xs px-2.5 py-1 rounded-md border
            ${copied
              ? 'border-green-300 bg-green-50 text-green-700'
              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
            }
          `}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-sm text-neutral-700 whitespace-pre-wrap font-sans leading-relaxed">
        {content}
      </pre>
    </div>
  );
}