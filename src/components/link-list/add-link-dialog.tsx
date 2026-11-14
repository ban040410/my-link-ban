"use client";

import React, { useState, useEffect } from "react";
import { LinkItem, LinkBlockType } from "@/types/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DynamicBlockIcon,
  Sparkles,
  Globe,
  BookOpen,
  Mail,
  ShoppingBag,
  Video,
  Heading,
  Link2,
} from "@/components/ui/icons";

interface AddLinkDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (block: Partial<LinkItem>) => void;
  editingItem: LinkItem | null;
}

const AVAILABLE_ICONS = [
  { name: "Sparkles", label: "반짝임" },
  { name: "Globe", label: "웹/글로벌" },
  { name: "BookOpen", label: "블로그/책" },
  { name: "Github", label: "깃허브" },
  { name: "Mail", label: "메일/연락" },
  { name: "ShoppingBag", label: "스토어/쇼핑" },
  { name: "Youtube", label: "유튜브" },
  { name: "Instagram", label: "인스타그램" },
];

export function AddLinkDialog({
  isOpen,
  onOpenChange,
  onSave,
  editingItem,
}: AddLinkDialogProps) {
  const [type, setType] = useState<LinkBlockType>("link");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("Globe");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (editingItem) {
      setType(editingItem.type);
      setTitle(editingItem.title);
      setUrl(editingItem.url || "");
      setIcon(editingItem.icon || "Globe");
      setErrorMessage("");
    } else {
      setType("link");
      setTitle("");
      setUrl("");
      setIcon("Globe");
      setErrorMessage("");
    }
  }, [editingItem, isOpen]);

  // Extract YouTube ID helper
  const parseYouTubeUrl = (inputUrl: string) => {
    try {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = inputUrl.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!title.trim()) {
      setErrorMessage("블록 제목을 입력해주세요.");
      return;
    }

    if (type === "link") {
      let finalUrl = url.trim();
      if (!finalUrl) {
        setErrorMessage("목적지 URL을 입력해주세요.");
        return;
      }

      if (finalUrl.toLowerCase().startsWith("javascript:")) {
        setErrorMessage("유효하지 않은 URL 프로토콜입니다.");
        return;
      }

      if (!/^https?:\/\//i.test(finalUrl) && !/^mailto:/i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }

      onSave({
        type: "link",
        title: title.trim(),
        url: finalUrl,
        icon,
      });
      onOpenChange(false);
    } else if (type === "header") {
      onSave({
        type: "header",
        title: title.trim(),
      });
      onOpenChange(false);
    } else if (type === "embed") {
      let embedTargetUrl = url.trim();
      if (!embedTargetUrl) {
        setErrorMessage("유튜브 동영상 링크를 입력해주세요.");
        return;
      }

      const videoId = parseYouTubeUrl(embedTargetUrl);
      const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : embedTargetUrl;

      onSave({
        type: "embed",
        title: title.trim(),
        url: embedTargetUrl,
        embedType: "youtube",
        embedUrl,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#18181b] border border-white/10 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-white">
            {editingItem ? "블록 수정하기" : "새 콘텐츠 블록 추가"}
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-400">
            방문자에게 표시할 링크, 섹션 구분 헤더, 유튜브 영상을 구성합니다.
          </DialogDescription>
        </DialogHeader>

        {/* Block Type Selection (Only selectable when creating new) */}
        {!editingItem && (
          <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-900 rounded-xl border border-white/5">
            <button
              type="button"
              onClick={() => {
                setType("link");
                setErrorMessage("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                type === "link"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>웹 링크</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType("header");
                setErrorMessage("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                type === "header"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Heading className="w-3.5 h-3.5" />
              <span>섹션 헤더</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setType("embed");
                setErrorMessage("");
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                type === "embed"
                  ? "bg-red-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>유튜브</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          {/* Title Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-300">
              {type === "header"
                ? "헤더 제목 (구분선 텍스트)"
                : type === "embed"
                ? "영상 제목"
                : "링크 제목"}
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                type === "header"
                  ? "예: FEATURED PROJECTS"
                  : type === "embed"
                  ? "예: 최신 프로젝트 소개 영상"
                  : "예: ⚡ 2026 포트폴리오 웹사이트"
              }
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:border-blue-500"
              maxLength={60}
            />
          </div>

          {/* URL Input (for Link and Embed) */}
          {type !== "header" && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-300">
                {type === "embed"
                  ? "유튜브 URL"
                  : "목적지 URL"}
              </label>
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={
                  type === "embed"
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://your-website.com"
                }
                className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus-visible:border-blue-500 text-xs font-mono"
              />
            </div>
          )}

          {/* Icon Selector (Only for Link block) */}
          {type === "link" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-medium text-zinc-300">
                아이콘 선택
              </label>
              <div className="grid grid-cols-4 gap-2">
                {AVAILABLE_ICONS.map((ic) => (
                  <button
                    key={ic.name}
                    type="button"
                    onClick={() => setIcon(ic.name)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs transition-all ${
                      icon === ic.name
                        ? "bg-blue-600/20 border-blue-500 text-white shadow-sm"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <DynamicBlockIcon name={ic.name} className="w-4 h-4 shrink-0" />
                    <span className="truncate">{ic.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs">
              {errorMessage}
            </div>
          )}

          <DialogFooter className="mt-2 flex gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
            >
              취소
            </Button>
            <Button
              type="submit"
              size="sm"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
            >
              {editingItem ? "변경사항 저장" : "블록 추가하기"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
