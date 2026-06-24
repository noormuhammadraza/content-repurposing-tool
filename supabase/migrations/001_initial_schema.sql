CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE repurpose_jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    original_text TEXT NOT NULL,
    tone TEXT NOT NULL CHECK (tone IN ('professional', 'casual', 'witty')),
    platforms JSONB NOT NULL DEFAULT '[]',
    outputs JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE repurpose_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own jobs" ON repurpose_jobs
    FOR ALL USING (auth.uid() = user_id);

CREATE INDEX idx_repurpose_jobs_user_id ON repurpose_jobs(user_id);