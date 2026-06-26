import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import OutputCard from '@/components/OutputCard';
import { createSupabaseServerClient } from '@/lib/supabase';
import type { Platform } from '@/types';

export default async function RepurposeResultPage({ params }: { params: { id: string } }) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  try {
    const { data: job, error } = await supabase
      .from('repurpose_jobs')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !job) {
      notFound();
    }

    const platforms = job.platforms as Platform[];
    const outputs = job.outputs as Record<Platform, string>;

    const formattedDate = new Date(job.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <a
            href="/dashboard"
            className="text-sm text-violet-600 hover:text-violet-700 mb-6 inline-block"
          >
            ← Back to dashboard
          </a>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-1">Repurposed Content</h1>
            <div className="flex items-center gap-3 text-sm text-neutral-500">
              <span>{formattedDate}</span>
              <span>·</span>
              <span className="capitalize">{job.tone} tone</span>
              <span>·</span>
              <span>{platforms.length} platform{platforms.length !== 1 ? 's' : ''}</span>
            </div>
          </div>

          <div className="mb-8 bg-white border border-neutral-200 rounded-xl p-4">
            <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide mb-2">
              Original Content
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed line-clamp-4">
              {job.original_text}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-neutral-900">Outputs</h2>
            {platforms.map((platform) => (
              <OutputCard
                key={platform}
                platform={platform}
                content={outputs[platform]}
              />
            ))}
          </div>
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}