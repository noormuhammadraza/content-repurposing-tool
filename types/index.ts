export type Platform = 'twitter' | 'linkedin' | 'email' | 'instagram' | 'youtube';

export type Tone = 'professional' | 'casual' | 'witty';

export interface RepurposeJob {
  id: string;
  user_id: string;
  original_text: string;
  tone: Tone;
  platforms: Platform[];
  outputs: Record<Platform, string>;
  created_at: string;
}

export interface PlatformConfig {
  id: Platform;
  label: string;
  description: string;
  maxLength: number;
}

export interface Profile {
  id: string;
  email: string;
}