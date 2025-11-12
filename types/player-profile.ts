export interface Position {
  id: string;
  name: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  minAge: number | null;
  maxAge: number | null;
  createdAt: Date;
}

export interface PlayerAchievement {
  id: string;
  playerId: string;
  title: string;
  description: string | null;
  date: Date | null;
  verified: boolean;
  createdAt: Date;
}

export interface PlayerVideo {
  id: string;
  playerId: string;
  videoUrl: string;
  title: string | null;
  description: string | null;
  createdAt: Date;
}

export interface PlayerProfile {
  id: string;
  userId: string;
  team: string | null;
  zone: string | null;
  bio: string | null;
  preferredFoot: string | null;
  positions: Position[];
  categoryId: string | null;
  category: Category | null;
  goals: number;
  assists: number;
  matchesPlayed: number;
  profileVideoUrl: string | null;
  videos: PlayerVideo[];
  achievements: PlayerAchievement[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayerProfileFormData {
  team?: string;
  zone?: string;
  bio?: string;
  preferredFoot?: string;
  positionIds?: string[];
  categoryId?: string;
  goals?: number;
  assists?: number;
  matchesPlayed?: number;
  profileVideoUrl?: string;
}

export interface VideoFormData {
  url: string;
  title: string;
  description: string;
}

export interface AchievementFormData {
  id?: string;
  title: string;
  description: string;
  date?: Date;
}

