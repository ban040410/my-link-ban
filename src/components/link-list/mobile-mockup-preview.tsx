"use client";

import React from "react";
import { LinkItem, UserProfile } from "@/types/link";
import { THEMES, ThemeId } from "@/lib/themes";
import {
  DynamicBlockIcon,
  SocialPlatformIcon,
  ExternalLink,
  Sparkles,
} from "@/components/ui/icons";

interface MobileMockupPreviewProps {
  profile: UserProfile;
  links: LinkItem[];
  selectedThemeId: ThemeId;
  onLinkClick?: (linkId: string) => void;
}

export function MobileMockupPreview({
  profile,
  links,
  selectedThemeId,
  onLinkClick,
}: MobileMockupPreviewProps) {
  const currentTheme = THEMES[selectedThemeId] || THEMES["dark-canvas"];

  // Filter only active links for the public/preview view
  const activeLinks = links
    .filter((l) => l.isActive)
    .sort((a, b) => a.position - b.position);

  const handleLinkAction = (e: React.MouseEvent, link: LinkItem) => {
    if (onLinkClick) {
      onLinkClick(link.id);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Smartphone Outer Shell */}
      <div className="relative w-full max-w-[340px] sm:max-w-[360px] h-[680px] bg-[#121214] rounded-[52px] p-3 shadow-2xl border-[6px] border-[#27272a] ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#18181b] border border-white/10"></div>
          <div className="w-10 h-1.5 rounded-full bg-[#27272a]"></div>
        </div>

        {/* Screen Bezel & Content Area */}
        <div
          className={`w-full h-full rounded-[42px] overflow-y-auto overflow-x-hidden flex flex-col justify-between p-5 pt-10 select-none scrollbar-none transition-colors duration-300 ${currentTheme.containerClass}`}
          style={{ scrollbarWidth: "none" }}
        >
          {/* Top Profile Section */}
          <div className="flex flex-col items-center text-center mt-2">
            {/* Avatar */}
            <div className="relative group">
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className={`w-20 h-20 rounded-full object-cover ${currentTheme.avatarRingClass}`}
              />
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-[10px] text-white">
                ✓
              </span>
            </div>

            {/* Display Name & Handle */}
            <h3 className={`mt-3 font-semibold text-base tracking-tight ${currentTheme.textColor}`}>
              {profile.displayName}
            </h3>
            <span className={`text-xs mt-0.5 font-mono ${currentTheme.mutedTextColor}`}>
              @{profile.username}
            </span>

            {/* Bio */}
            <p className={`mt-2 text-xs leading-relaxed max-w-[260px] ${currentTheme.mutedTextColor}`}>
              {profile.bio}
            </p>

            {/* Social Links Bar */}
            {profile.socialLinks && profile.socialLinks.length > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
                {profile.socialLinks.map((soc) => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-95 ${currentTheme.socialBtnClass}`}
                    title={soc.platform}
                  >
                    <SocialPlatformIcon platform={soc.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links & Content Blocks */}
          <div className="flex flex-col gap-2.5 my-6 flex-1">
            {activeLinks.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center text-xs opacity-50 my-auto">
                <p>활성화된 링크가 없습니다.</p>
                <p className="mt-1">좌측 패널에서 링크를 켜보세요.</p>
              </div>
            ) : (
              activeLinks.map((item) => {
                if (item.type === "header") {
                  return (
                    <div
                      key={item.id}
                      className="pt-3 pb-1 text-center"
                    >
                      <span className={currentTheme.headerClass}>
                        {item.title}
                      </span>
                    </div>
                  );
                }

                if (item.type === "embed") {
                  return (
                    <div
                      key={item.id}
                      className={`overflow-hidden rounded-xl p-2.5 flex flex-col gap-2 ${currentTheme.cardClass}`}
                    >
                      <span className="text-xs font-medium truncate px-1">
                        {item.title}
                      </span>
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/80">
                        {item.embedUrl ? (
                          <iframe
                            src={item.embedUrl}
                            title={item.title}
                            className="w-full h-full border-0 pointer-events-auto"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500">
                            동영상 미리보기
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }

                // Regular Link Block
                return (
                  <a
                    key={item.id}
                    href={item.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => handleLinkAction(e, item)}
                    className={`group w-full p-3.5 rounded-2xl flex items-center justify-between gap-3 text-left transition-all active:scale-[0.98] ${currentTheme.cardClass}`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center bg-black/10 dark:bg-white/10">
                        <DynamicBlockIcon name={item.icon} className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium truncate">
                        {item.title}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                  </a>
                );
              })
            )}
          </div>

          {/* Viral Footer Badge */}
          <div className="pt-4 pb-2 text-center border-t border-current/10 mt-auto">
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium opacity-70 hover:opacity-100 transition-opacity"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Created with MyLink</span>
            </a>
          </div>
        </div>

        {/* Home Bar Indicator */}
        <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2 shrink-0"></div>
      </div>
    </div>
  );
}
