import { redirect } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { createSupabaseServerClient } from '@/lib/supabase';
import type { RepurposeJob, Platform } from '@/types';

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: jobs, error } = await supabase
    .from('repurpose_jobs')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20);

  const jobsData = error ? [] : (jobs as RepurposeJob[]);

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-neutral-900">My Repurposed Content</h1>
          <Link
            href="/repurpose"
            className="bg-violet-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-violet-700"
          >
            New +
          </Link>
        </div>

        {jobsData.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500 mb-4">No repurposed content yet.</p>
            <Link
              href="/repurpose"
              className="text-violet-600 hover:text-violet-700 text-sm font-medium"
            >
              Create your first repurposed content →
            </Link>
          </div>
        )}

        {jobsData.length > 0 && (
          <div className="space-y-3">
            {jobsData.map((job) => (
              <Link key={job.id} href={`/repurpose/${job.id}`}>
                <div className="bg-white border border-neutral-200 rounded-xl px-5 py-4 hover:border-neutral-300 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-neutral-900">
                      {job.original_text.slice(0, 80)}...
                    </p>
                    <span className="text-xs text-neutral-400 whitespace-nowrap ml-4">
                      {formatDate(job.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="capitalize text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">
                      {job.tone}
                    </span>
                    {(job.platforms as Platform[]).map((platform) => (
                      <span key={platform} className="text-xs px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}