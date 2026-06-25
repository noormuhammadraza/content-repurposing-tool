import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase';
import { openai } from '@/lib/openai';
import type { Platform } from '@/types';

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { originalText, platforms, tone } = await req.json();

    if (!originalText || originalText.trim() === '') {
      return NextResponse.json({ error: 'Original text is required' }, { status: 400 });
    }
    if (!platforms || !Array.isArray(platforms) || platforms.length === 0) {
      return NextResponse.json({ error: 'Select at least one platform' }, { status: 400 });
    }
    if (!tone) {
      return NextResponse.json({ error: 'Tone is required' }, { status: 400 });
    }

    const systemPrompt = `You are a social media content expert. Repurpose the provided text for the requested platforms using a ${tone} tone throughout. Return ONLY valid JSON with a key for each requested platform.

Platform rules:
- twitter: A thread of 5-8 tweets, each under 280 characters, numbered 1/ 2/ 3/ etc.
- linkedin: 150-300 words, professional storytelling structure, end with a question to drive engagement
- email: First line is the subject line, then body text of 200-300 words, conversational but valuable
- instagram: Punchy caption under 150 words, end with 5-10 relevant hashtags on a new line
- youtube: Hook + 3 talking points + CTA, designed to be read aloud in under 90 seconds

Only include keys for the platforms requested. Do not include any other text outside the JSON object.`;

    const userPrompt = `Repurpose this content for these platforms: ${platforms.join(', ')}

Content:
${originalText}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }
    const outputs = JSON.parse(content) as Record<Platform, string>;

    const { data: job, error: dbError } = await supabase
      .from('repurpose_jobs')
      .insert({
        user_id: user.id,
        original_text: originalText,
        tone,
        platforms,
        outputs,
      })
      .select()
      .single();

    if (dbError || !job) {
      return NextResponse.json({ error: 'Failed to save job' }, { status: 500 });
    }

    return NextResponse.json({ data: job }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}