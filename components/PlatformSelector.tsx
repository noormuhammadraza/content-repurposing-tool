'use client';

import type { Platform, PlatformConfig } from '@/types';

const PLATFORMS: PlatformConfig[] = [
  { id: 'twitter', label: 'Twitter / X', description: 'Thread of 5-8 tweets', maxLength: 280 },
  { id: 'linkedin', label: 'LinkedIn', description: 'Professional post', maxLength: 3000 },
  { id: 'email', label: 'Email', description: 'Newsletter section', maxLength: 1500 },
  { id: 'instagram', label: 'Instagram', description: 'Caption + hashtags', maxLength: 2200 },
  { id: 'youtube', label: 'YouTube Shorts', description: '90-second script', maxLength: 1000 },
];

export default function PlatformSelector({ selected, onChange }: { selected: Platform[]; onChange: (platforms: Platform[]) => void }) {
  function togglePlatform(platform: Platform) {
    if (selected.includes(platform)) {
      onChange(selected.filter(p => p !== platform));
    } else {
      onChange([...selected, platform]);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {PLATFORMS.map((platform) => {
        const isSelected = selected.includes(platform.id);
        return (
          <button
            key={platform.id}
            type="button"
            onClick={() => togglePlatform(platform.id)}
            className={`
              px-3 py-2 rounded-lg border text-left
              ${isSelected
                ? 'border-violet-500 bg-violet-50 text-violet-700'
                : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
              }
            `}
          >
            <div className="text-sm font-medium">{platform.label}</div>
            <div className={`text-xs ${isSelected ? 'text-violet-500' : 'text-neutral-500'}`}>
              {platform.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}