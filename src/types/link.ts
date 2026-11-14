export type LinkBlockType = "link" | "header" | "embed";

export interface LinkItem {
  id: string;
  type: LinkBlockType;
  title: string;
  url?: string;
  icon?: string; // Lucide icon name (e.g. "Github", "Globe", "Youtube", "BookOpen", "Mail", "Sparkles", "ShoppingBag")
  isActive: boolean;
  position: number;
  clickCount: number;
  embedType?: "youtube" | "spotify";
  embedUrl?: string;
  createdAt: string;
}

export interface SocialLinkItem {
  id: string;
  platform: "instagram" | "youtube" | "github" | "twitter" | "mail" | "linkedin";
  url: string;
  position: number;
}

export interface UserProfile {
  id: string;
  username: string; // @username
  displayName: string;
  bio: string;
  avatarUrl: string;
  themeId: "minimal-light" | "dark-canvas" | "sunset-glow" | "neo-brutalism" | "glassmorphism";
  socialLinks: SocialLinkItem[];
}
