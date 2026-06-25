'use client';

import type { Tone } from '@/types';

const TONES = [
  { id: 'professional', label: 'Professional', description: 'Formal and authoritative' },
  { id: 'casual', label: 'Casual', description: 'Friendly and conversational' },
  { id: 'witty', label: 'Witty', description: 'Clever and entertaining' },
] as const;

export default function ToneSelector({ value, onChange }: { value: Tone; onChange: (tone: Tone) => void }) {
  return (
    <div className="flex gap-3">
      {TONES.map((tone) => (
        <button
          key={tone.id}
          type="button"
          onClick={() => onChange(tone.id)}
          className={`
            flex-1 px-3 py-2.5 rounded-lg border text-left
            ${value === tone.id
              ? 'border-violet-500 bg-violet-50 text-violet-700'
              : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
            }
          `}
        >
          <div className="text-sm font-medium">{tone.label}</div>
          <div className="text-xs text-neutral-500">{tone.description}</div>
        </button>
      ))}
    </div>
  );
}