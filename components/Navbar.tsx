'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase-browser';

export default function Navbar() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createSupabaseBrowserClient();
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  return (
    <nav className="bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-violet-600 text-lg">
          RepurposeAI
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/repurpose"
            className="text-sm bg-violet-600 text-white px-3 py-1.5 rounded-lg hover:bg-violet-700"
          >
            New +
          </Link>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            Sign out
          </button>
        </div>
      </div>
    </nav>
  );
}