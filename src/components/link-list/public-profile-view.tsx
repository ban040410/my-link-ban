"use client";

import React, { useState } from "react";
import { LinkItem, UserProfile } from "@/types/link";
import { THEMES, ThemeId } from "@/lib/themes";
import {
  DynamicBlockIcon,
  SocialPlatformIcon,
  ExternalLink,
  Sparkles,
  Share2,
  Check,
  Copy,
} from "@/components/ui/icons";
import { toast } from "sonner";

interface PublicProfileViewProps {
  profile: UserProfile;
  links: LinkItem[];
  themeId?: ThemeId;
  onLinkClick?: (linkId: string) => void;
}

export function PublicProfileView({
  profile,
  links,
  themeId = "dark-canvas",
  onLinkClick,
}: PublicProfileViewProps) {
  const [copied, setCopied] = useState(false);
  const currentTheme = THEMES[themeId] || THEMES["dark-canvas"];

  // Filter only active links and sort by position
  const activeLinks = links
    .filter((l) => l.isActive)
    .sort((a, b) => a.position - b.position);

  const handleShare = () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : `https://mylink.io/@${profile.username}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("프로필 링크가 복사되었습니다!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleItemClick = (link: LinkItem) => {
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 transition-colors duration-300 ${currentTheme.containerClass}`}
    >
      {/* Top Header Floating Share Bar */}
      <header className="w-full max-w-xl flex justify-end items-center py-2">
        <button
          onClick={handleShare}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all active:scale-95 ${currentTheme.socialBtnClass}`}
          title="공유하기"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>복사완료</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>공유</span>
            </>
          )}
        </button>
      </header>

      {/* Main Single Column Profile Container (Max-width 640px) */}
      <main className="w-full max-w-md sm:max-w-lg flex flex-col items-center my-auto py-6">
        {/* Profile Card */}
        <div className="flex flex-col items-center text-center w-full">
          {/* Avatar with Status Ring */}
          <div className="relative mb-4">
            <img
              src={profile.avatarUrl}
              alt={profile.displayName}
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-2xl ${currentTheme.avatarRingClass}`}
            />
            <span className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-xs text-white">
              ✓
            </span>
          </div>

          {/* Display Name & Handle */}
          <h1
            className={`text-xl sm:text-2xl font-bold tracking-tight ${currentTheme.textColor}`}
          >
            {profile.displayName}
          </h1>
          <span
            className={`text-xs sm:text-sm font-mono mt-1 font-medium ${currentTheme.mutedTextColor}`}
          >
            @{profile.username}
          </span>

          {/* Bio */}
          <p
            className={`mt-3 text-sm sm:text-base leading-relaxed max-w-md font-normal px-2 ${currentTheme.mutedTextColor}`}
          >
            {profile.bio}
          </p>

          {/* Social Links Bar */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex items-center gap-2.5 mt-5 flex-wrap justify-center">
              {profile.socialLinks.map((soc) => (
                <a
                  key={soc.id}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${currentTheme.socialBtnClass}`}
                  title={soc.platform}
                >
                  <SocialPlatformIcon platform={soc.platform} className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Links and Content Blocks Stack */}
        <section className="w-full flex flex-col gap-3.5 mt-8">
          {activeLinks.length === 0 ? (
            <div className="text-center py-12 text-sm opacity-60">
              표시할 링크가 없습니다.
            </div>
          ) : (
            activeLinks.map((item) => {
              // Section Header
              if (item.type === "header") {
                return (
                  <div
                    key={item.id}
                    className="pt-5 pb-1 text-center"
                  >
                    <span className={currentTheme.headerClass}>
                      {item.title}
                    </span>
                  </div>
                );
              }

              // YouTube Embed Block
              if (item.type === "embed") {
                return (
                  <div
                    key={item.id}
                    className={`overflow-hidden rounded-2xl p-4 flex flex-col gap-3 ${currentTheme.cardClass}`}
                  >
                    <span className="text-sm font-medium px-1">
                      {item.title}
                    </span>
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/80 shadow-md">
                      {item.embedUrl ? (
                        <iframe
                          src={item.embedUrl}
                          title={item.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
                          동영상 플레이어
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              // Standard Link Item Card
              return (
                <a
                  key={item.id}
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleItemClick(item)}
                  className={`group w-full p-4 sm:p-4.5 rounded-2xl flex items-center justify-between gap-4 text-left transition-all hover:scale-[1.01] active:scale-[0.99] ${currentTheme.cardClass}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center bg-black/10 dark:bg-white/10 group-hover:scale-105 transition-transform">
                      <DynamicBlockIcon name={item.icon} className="w-5 h-5" />
                    </div>
                    <span className="text-sm sm:text-base font-medium truncate">
                      {item.title}
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              );
            })
          )}
        </section>
      </main>

      {/* Viral Footer ("Create your own MyLink") */}
      <footer className="w-full max-w-xl py-8 flex flex-col items-center justify-center gap-2 border-t border-current/10 mt-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide bg-current/5 hover:bg-current/10 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>나만의 마이링크(MyLink) 무료로 만들기</span>
        </a>
        <p className="text-[11px] opacity-40">
          © 2026 MyLink. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
