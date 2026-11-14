"use client";

import React, { useState } from "react";
import { LinkItem, UserProfile } from "@/types/link";
import { dummyProfile as initialProfile, dummyLinks as initialLinks } from "@/data/links";
import { ThemeId, THEMES } from "@/lib/themes";
import { LinkCardItem } from "@/components/link-list/link-card-item";
import { AddLinkDialog } from "@/components/link-list/add-link-dialog";
import { MobileMockupPreview } from "@/components/link-list/mobile-mockup-preview";
import { PublicProfileView } from "@/components/link-list/public-profile-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Copy,
  ExternalLink,
  Search,
  Sparkles,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Smartphone,
  Layers,
  MousePointerClick,
  Check,
} from "@/components/ui/icons";
import { toast } from "sonner";

export function LinkManagerView() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [links, setLinks] = useState<LinkItem[]>(initialLinks);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>(initialProfile.themeId);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "active" | "inactive" | "header" | "embed">("all");
  const [viewMode, setViewMode] = useState<"split" | "public">("split");
  const [mobileTab, setMobileTab] = useState<"editor" | "preview">("editor");

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LinkItem | null>(null);

  // Copy state
  const [copied, setCopied] = useState(false);

  // Derived metrics
  const totalCount = links.length;
  const activeCount = links.filter((l) => l.isActive).length;
  const totalClicks = links.reduce((sum, item) => sum + (item.clickCount || 0), 0);

  // Filtered links
  const filteredLinks = links.filter((item) => {
    // Type filter
    if (filterType === "active" && !item.isActive) return false;
    if (filterType === "inactive" && item.isActive) return false;
    if (filterType === "header" && item.type !== "header") return false;
    if (filterType === "embed" && item.type !== "embed") return false;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchUrl = item.url ? item.url.toLowerCase().includes(q) : false;
      return matchTitle || matchUrl;
    }

    return true;
  });

  // Handlers
  const handleToggleActive = (id: string, active: boolean) => {
    setLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: active } : item))
    );
    toast.success(active ? "링크가 노출 활성화되었습니다." : "링크가 숨김 처리되었습니다.");
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setLinks((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
      return updated.map((item, idx) => ({ ...item, position: idx + 1 }));
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= links.length - 1) return;
    setLinks((prev) => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
      return updated.map((item, idx) => ({ ...item, position: idx + 1 }));
    });
  };

  const handleOpenAddDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (item: LinkItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSaveBlock = (blockData: Partial<LinkItem>) => {
    if (editingItem) {
      // Update existing item
      setLinks((prev) =>
        prev.map((item) =>
          item.id === editingItem.id ? { ...item, ...blockData } : item
        )
      );
      toast.success("블록이 성공적으로 수정되었습니다.");
    } else {
      // Create new item
      const newItem: LinkItem = {
        id: `link-${Date.now()}`,
        type: blockData.type || "link",
        title: blockData.title || "새 링크",
        url: blockData.url,
        icon: blockData.icon || "Globe",
        isActive: true,
        position: links.length + 1,
        clickCount: 0,
        embedType: blockData.embedType,
        embedUrl: blockData.embedUrl,
        createdAt: new Date().toISOString(),
      };
      setLinks((prev) => [...prev, newItem]);
      toast.success("새 블록이 추가되었습니다.");
    }
  };

  const handleDeleteBlock = (id: string) => {
    setLinks((prev) => prev.filter((item) => item.id !== id));
    toast.success("블록이 삭제되었습니다.");
  };

  const handleCopyProfileUrl = () => {
    const url = `https://mylink.io/@${profile.username}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(`${url} 주소가 복사되었습니다!`);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleResetDummyData = () => {
    setLinks(initialLinks);
    setProfile(initialProfile);
    setSelectedThemeId(initialProfile.themeId);
    toast.info("표준 더미 데이터셋 10종이 초기화되었습니다.");
  };

  const handleLinkClickSimulation = (linkId: string) => {
    setLinks((prev) =>
      prev.map((item) =>
        item.id === linkId ? { ...item, clickCount: item.clickCount + 1 } : item
      )
    );
  };

  // If viewing fullscreen public profile
  if (viewMode === "public") {
    return (
      <div className="relative min-h-screen">
        {/* Floating Top Nav to return to Editor */}
        <div className="fixed top-4 left-4 z-50">
          <Button
            size="sm"
            onClick={() => setViewMode("split")}
            className="bg-black/80 hover:bg-black text-white border border-white/20 backdrop-blur-md shadow-xl"
          >
            ← 링크 관리 에디터로 돌아가기
          </Button>
        </div>
        <PublicProfileView
          profile={profile}
          links={links}
          themeId={selectedThemeId}
          onLinkClick={handleLinkClickSimulation}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col">
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#121215]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Logo & Service Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
              🔗
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">
                  마이링크
                </span>
                <span className="font-mono text-xs text-zinc-400">MyLink</span>
                <Badge
                  variant="outline"
                  className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-[10px] px-1.5 py-0 h-4"
                >
                  v1.2.0 PRD
                </Badge>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block">
                누구나 3분 만에 만드는 나만의 바이오 링크
              </p>
            </div>
          </div>

          {/* User Handle & Copy Bar */}
          <div className="flex items-center gap-2 bg-[#18181b] border border-white/10 rounded-full px-3 py-1.5 shadow-sm">
            <span className="text-xs text-zinc-400 hidden md:inline">내 링크:</span>
            <span className="text-xs font-mono font-medium text-blue-400">
              mylink.io/@{profile.username}
            </span>
            <button
              onClick={handleCopyProfileUrl}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="링크 복사"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetDummyData}
              title="더미 데이터 초기화"
              className="border-zinc-700 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 text-xs hidden sm:inline-flex"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">데이터 리셋</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode("public")}
              className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 text-xs gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span>퍼블릭 뷰</span>
              <ExternalLink className="w-3 h-3 text-zinc-500" />
            </Button>

            <Button
              size="sm"
              onClick={handleOpenAddDialog}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs gap-1.5 shadow-lg shadow-blue-600/20"
            >
              <Plus className="w-4 h-4" />
              <span>새 블록 추가</span>
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Key Metrics Summary Banner */}
      <section className="w-full bg-[#141417] border-b border-white/5 py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap text-xs">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">총 블록:</span>
              <span className="font-mono font-semibold text-white">
                {totalCount}개
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">공개 노출:</span>
              <span className="font-mono font-semibold text-emerald-400">
                {activeCount}개
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">누적 클릭:</span>
              <span className="font-mono font-semibold text-blue-400 flex items-center gap-1">
                <MousePointerClick className="w-3 h-3" />
                {totalClicks.toLocaleString()}회
              </span>
            </div>
          </div>

          <div className="text-zinc-500 text-[11px] hidden lg:block">
            💡 블록의 스위치를 토글하면 우측 스마트폰 목업에 0.1초 내 실시간 반영됩니다.
          </div>
        </div>
      </section>

      {/* Mobile Switch Tabs (Visible only on <1024px screens) */}
      <div className="lg:hidden w-full bg-[#18181b] border-b border-white/10 p-2 flex justify-center gap-2">
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex-1 max-w-[200px] py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "editor"
              ? "bg-blue-600 text-white shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>링크 편집 ({links.length})</span>
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 max-w-[200px] py-1.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === "preview"
              ? "bg-blue-600 text-white shadow"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>실시간 프리뷰</span>
        </button>
      </div>

      {/* 3. Main 2-Column Split Workspace */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Link Block Management Panel */}
        <section
          className={`lg:col-span-7 flex flex-col gap-5 ${
            mobileTab === "preview" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Section Header & Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>링크 및 콘텐츠 블록 관리</span>
                <span className="text-xs font-mono text-zinc-400">
                  ({filteredLinks.length}/{totalCount})
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                드래그 또는 화살표로 순서를 재배치하고 노출 여부를 제어합니다.
              </p>
            </div>

            {/* Quick Add Block Button */}
            <Button
              size="sm"
              onClick={handleOpenAddDialog}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>블록 추가</span>
            </Button>
          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#141417] p-2.5 rounded-2xl border border-white/5">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="제목 또는 URL 검색..."
                className="pl-9 h-8 bg-zinc-900 border-zinc-700/80 text-xs text-white placeholder:text-zinc-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: "all", label: "전체" },
                { id: "active", label: "활성" },
                { id: "inactive", label: "비활성" },
                { id: "header", label: "헤더" },
                { id: "embed", label: "유튜브" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id as any)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition-all whitespace-nowrap ${
                    filterType === f.id
                      ? "bg-zinc-800 text-white font-medium border border-white/10"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Link Cards List */}
          <div className="flex flex-col gap-3">
            {filteredLinks.length === 0 ? (
              <div className="p-10 rounded-2xl border border-dashed border-zinc-800 text-center flex flex-col items-center justify-center text-zinc-500 gap-2">
                <Search className="w-8 h-8 opacity-40" />
                <p className="text-sm font-medium">일치하는 링크 블록이 없습니다.</p>
                <p className="text-xs text-zinc-600">
                  검색어를 변경하거나 필터를 초기화해보세요.
                </p>
              </div>
            ) : (
              filteredLinks.map((item, idx) => (
                <LinkCardItem
                  key={item.id}
                  item={item}
                  index={idx}
                  totalCount={filteredLinks.length}
                  onToggleActive={handleToggleActive}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onEdit={handleOpenEditDialog}
                  onDelete={handleDeleteBlock}
                />
              ))
            )}

            {/* Bottom Dashed Add Card */}
            <button
              onClick={handleOpenAddDialog}
              className="w-full p-4 rounded-xl border border-dashed border-zinc-700/80 hover:border-blue-500/80 bg-zinc-900/30 hover:bg-zinc-900/70 text-zinc-400 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-medium cursor-pointer group mt-2"
            >
              <div className="w-6 h-6 rounded-full bg-zinc-800 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </div>
              <span>새로운 링크, 헤더, 유튜브 블록 추가하기</span>
            </button>
          </div>
        </section>

        {/* Right Column: Sticky Real-time Mobile Preview */}
        <section
          className={`lg:col-span-5 flex flex-col items-center gap-5 lg:sticky lg:top-24 ${
            mobileTab === "editor" ? "hidden lg:flex" : "flex"
          }`}
        >
          {/* Theme Selector Toolbar */}
          <div className="w-full max-w-[360px] bg-[#141417] p-3 rounded-2xl border border-white/5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
                <span>테마 프리셋 (5종)</span>
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                {THEMES[selectedThemeId]?.name}
              </span>
            </div>

            {/* 5 Theme Buttons */}
            <div className="grid grid-cols-5 gap-1.5">
              {(Object.keys(THEMES) as ThemeId[]).map((themeKey) => {
                const th = THEMES[themeKey];
                const isSelected = selectedThemeId === themeKey;
                return (
                  <button
                    key={themeKey}
                    onClick={() => {
                      setSelectedThemeId(themeKey);
                      toast.info(`테마가 '${th.nameKo}'(으)로 변경되었습니다.`);
                    }}
                    title={`${th.nameKo} - ${th.description}`}
                    className={`h-9 rounded-lg flex flex-col items-center justify-center border text-[10px] font-medium transition-all ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/30 text-white font-bold"
                        : "border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                    } ${th.previewBg}`}
                  >
                    <span className="truncate max-w-[50px] px-0.5">
                      {th.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Mobile Mockup Preview */}
          <MobileMockupPreview
            profile={profile}
            links={links}
            selectedThemeId={selectedThemeId}
            onLinkClick={handleLinkClickSimulation}
          />
        </section>
      </main>

      {/* Add / Edit Block Dialog */}
      <AddLinkDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveBlock}
        editingItem={editingItem}
      />
    </div>
  );
}
