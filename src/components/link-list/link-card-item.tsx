"use client";

import React from "react";
import { LinkItem } from "@/types/link";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DynamicBlockIcon,
  ChevronUp,
  ChevronDown,
  Trash2,
  Edit2,
  ExternalLink,
  Video,
  Heading,
  MousePointerClick,
  GripVertical,
} from "@/components/ui/icons";

interface LinkCardItemProps {
  item: LinkItem;
  index: number;
  totalCount: number;
  onToggleActive: (id: string, active: boolean) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onEdit: (item: LinkItem) => void;
  onDelete: (id: string) => void;
}

export function LinkCardItem({
  item,
  index,
  totalCount,
  onToggleActive,
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
}: LinkCardItemProps) {
  const isFirst = index === 0;
  const isLast = index === totalCount - 1;

  // Format click count with commas
  const formattedClicks = item.clickCount.toLocaleString();

  return (
    <Card
      className={`relative transition-all duration-200 border ${
        item.isActive
          ? "bg-[#18181b] border-white/10 hover:border-white/20 text-white"
          : "bg-[#141417]/60 border-white/5 opacity-65 text-zinc-400"
      }`}
    >
      <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Drag Handle, Icon, and Information */}
        <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
          {/* Order Handle Controls */}
          <div className="flex flex-col items-center justify-center shrink-0 -ml-1 text-zinc-500">
            <button
              onClick={() => onMoveUp(index)}
              disabled={isFirst}
              title="위로 이동"
              className="p-1 hover:text-white disabled:opacity-20 disabled:hover:text-zinc-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-zinc-500 select-none">
              {index + 1}
            </span>
            <button
              onClick={() => onMoveDown(index)}
              disabled={isLast}
              title="아래로 이동"
              className="p-1 hover:text-white disabled:opacity-20 disabled:hover:text-zinc-500 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Block Type Icon Box */}
          <div
            className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
              item.type === "header"
                ? "bg-purple-950/60 text-purple-300 border border-purple-800/40"
                : item.type === "embed"
                ? "bg-red-950/60 text-red-300 border border-red-800/40"
                : "bg-blue-950/60 text-blue-300 border border-blue-800/40"
            }`}
          >
            {item.type === "header" ? (
              <Heading className="w-5 h-5" />
            ) : item.type === "embed" ? (
              <Video className="w-5 h-5" />
            ) : (
              <DynamicBlockIcon name={item.icon} className="w-5 h-5" />
            )}
          </div>

          {/* Block Details */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`font-medium text-sm sm:text-[15px] truncate ${
                  item.isActive ? "text-white" : "text-zinc-400 line-through"
                }`}
              >
                {item.title}
              </span>

              {/* Type Badge */}
              <Badge
                variant="outline"
                className={`text-[10px] px-1.5 py-0 h-4 uppercase font-semibold tracking-wider ${
                  item.type === "header"
                    ? "bg-purple-500/10 text-purple-300 border-purple-500/30"
                    : item.type === "embed"
                    ? "bg-red-500/10 text-red-300 border-red-500/30"
                    : "bg-blue-500/10 text-blue-300 border-blue-500/30"
                }`}
              >
                {item.type === "header"
                  ? "헤더"
                  : item.type === "embed"
                  ? "유튜브"
                  : "링크"}
              </Badge>

              {!item.isActive && (
                <Badge
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 h-4 bg-zinc-800 text-zinc-400 border-zinc-700"
                >
                  비노출
                </Badge>
              )}
            </div>

            {/* URL or Subtitle */}
            {item.type !== "header" && item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-blue-400 transition-colors truncate flex items-center gap-1 mt-1 max-w-[280px] sm:max-w-md"
              >
                <span className="truncate">{item.url}</span>
                <ExternalLink className="w-3 h-3 shrink-0 opacity-60" />
              </a>
            )}

            {item.type === "header" && (
              <span className="text-xs text-zinc-500 mt-1">
                링크 그룹을 구분하는 섹션 헤더
              </span>
            )}
          </div>
        </div>

        {/* Right: Metrics, Switch, and Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
          {/* Click Count Badge */}
          {item.type !== "header" && (
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/60 text-xs font-mono text-zinc-300"
              title="누적 클릭수"
            >
              <MousePointerClick className="w-3.5 h-3.5 text-zinc-400" />
              <span>{formattedClicks}</span>
            </div>
          )}

          {/* On/Off Switch */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400 hidden lg:inline">
              {item.isActive ? "노출 중" : "숨김"}
            </span>
            <Switch
              checked={item.isActive}
              onCheckedChange={(checked) => onToggleActive(item.id, checked)}
              aria-label={`${item.title} 노출 토글`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(item)}
              title="블록 수정"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(item.id)}
              title="블록 삭제"
              className="text-zinc-400 hover:text-red-400 hover:bg-red-950/30"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
