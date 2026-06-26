'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ToneSelector from '@/components/ToneSelector';
import PlatformSelector from '@/components/PlatformSelector';
import OutputCard from '@/components/OutputCard';
import type { Platform, Tone, RepurposeJob } from '@/types';

export default function RepurposePage() {
  const [originalText, setOriginalText] = useState('');
  const [tone, setTone] = useState<Tone>('professional');
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [job, setJob] = useState<RepurposeJob | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setJob(null);

    if (originalText.trim() === '') {
      setError('Please enter some content to repurpose');
      setLoading(false);
      return;
    }
    if (platforms.length === 0) {
      setError('Please select at least one platform');
      setLoading(false);
      return;
    }

    const response = await fetch('/api/repurpose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalText, platforms, tone }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || 'Something went wrong');
      setLoading(false);
      return;
    }

    setJob(json.data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">Repurpose Content</h1>
        <p className="text-neutral-500 text-sm mb-8">Paste your content, choose platforms, get results</p>

        <div className={`grid gap-8 ${job ? 'grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Your content</label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                placeholder="Paste your blog post, article, or any long-form content here..."
                rows={8}
                className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                disabled={loading}
              />
            </div>

            <div>
              <p className="block text-sm font-medium text-neutral-700 mb-2">Select tone</p>
              <ToneSelector value={tone} onChange={setTone} />
            </div>

            <div>
              <p className="block text-sm font-medium text-neutral-700 mb-2">Select platforms</p>
              <PlatformSelector selected={platforms} onChange={setPlatforms} />
            </div>

            {error && (
              <div role="alert" className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-violet-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Repurposing...' : 'Repurpose Content'}
            </button>
          </div>

          {job && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-neutral-900">Results</h2>
              {job.platforms.map((platform) => (
                <OutputCard
                  key={platform}
                  platform={platform}
                  content={job.outputs[platform]}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}