export type ThemeId =
  | "minimal-light"
  | "dark-canvas"
  | "sunset-glow"
  | "neo-brutalism"
  | "glassmorphism";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  nameKo: string;
  description: string;
  containerClass: string;
  cardClass: string;
  headerClass: string;
  socialBtnClass: string;
  badgeClass: string;
  avatarRingClass: string;
  textColor: string;
  mutedTextColor: string;
  accentColor: string;
  previewBg: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  "dark-canvas": {
    id: "dark-canvas",
    name: "Dark Canvas",
    nameKo: "다크 캔버스 (기본)",
    description: "세련된 딥 다크 모드 & 고대비 미니멀리즘",
    containerClass: "bg-[#09090b] text-white",
    cardClass:
      "bg-[#18181b] text-white border border-white/10 shadow-lg hover:border-white/25 hover:bg-[#202025] transition-all",
    headerClass: "text-zinc-400 font-semibold tracking-wider text-xs",
    socialBtnClass:
      "bg-[#27272a] hover:bg-[#3f3f46] text-white border border-white/10 hover:border-white/25 shadow-sm transition-all",
    badgeClass: "bg-zinc-800 text-zinc-300 border border-zinc-700/60",
    avatarRingClass: "ring-2 ring-white/20 shadow-xl",
    textColor: "text-white",
    mutedTextColor: "text-zinc-400",
    accentColor: "#3b82f6",
    previewBg: "bg-[#09090b]",
  },
  "minimal-light": {
    id: "minimal-light",
    name: "Minimal Light",
    nameKo: "미니멀 라이트",
    description: "깔끔하고 세련된 화이트/그레이 모던 스타일",
    containerClass: "bg-[#f8fafc] text-slate-900",
    cardClass:
      "bg-white text-slate-900 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all",
    headerClass: "text-slate-500 font-semibold tracking-wider text-xs",
    socialBtnClass:
      "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-sm transition-all",
    badgeClass: "bg-slate-100 text-slate-700 border border-slate-200",
    avatarRingClass: "ring-2 ring-slate-300 shadow-md",
    textColor: "text-slate-900",
    mutedTextColor: "text-slate-500",
    accentColor: "#2563eb",
    previewBg: "bg-white",
  },
  "sunset-glow": {
    id: "sunset-glow",
    name: "Sunset Glow",
    nameKo: "선셋 글로우",
    description: "감성적인 보라와 웜 오렌지 그라데이션",
    containerClass:
      "bg-gradient-to-b from-[#2b1055] via-[#4c1d34] to-[#1a052b] text-white",
    cardClass:
      "bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/30 shadow-lg shadow-purple-950/40 transition-all",
    headerClass: "text-amber-200/80 font-semibold tracking-wider text-xs",
    socialBtnClass:
      "bg-white/15 hover:bg-white/25 text-white border border-white/20 backdrop-blur-md shadow-sm transition-all",
    badgeClass: "bg-amber-500/20 text-amber-200 border border-amber-500/30",
    avatarRingClass: "ring-2 ring-amber-400/50 shadow-xl shadow-amber-500/20",
    textColor: "text-white",
    mutedTextColor: "text-amber-200/70",
    accentColor: "#f59e0b",
    previewBg: "bg-gradient-to-r from-purple-900 to-amber-700",
  },
  "neo-brutalism": {
    id: "neo-brutalism",
    name: "Neo Brutalism",
    nameKo: "네오 브루탈리즘",
    description: "볼드한 블랙 아웃라인과 하드 드롭 섀도우",
    containerClass: "bg-[#fffbeb] text-black",
    cardClass:
      "bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0px_#000] transition-all",
    headerClass:
      "text-black font-extrabold uppercase tracking-widest text-xs bg-yellow-300 px-3 py-1 border-2 border-black inline-block rounded shadow-[2px_2px_0px_#000]",
    socialBtnClass:
      "bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-black hover:bg-yellow-200 transition-all",
    badgeClass:
      "bg-yellow-200 text-black border border-black font-mono font-bold",
    avatarRingClass: "ring-3 ring-black shadow-[4px_4px_0px_#000]",
    textColor: "text-black",
    mutedTextColor: "text-black/80",
    accentColor: "#000000",
    previewBg: "bg-yellow-300 border-2 border-black",
  },
  glassmorphism: {
    id: "glassmorphism",
    name: "Glassmorphism",
    nameKo: "글래스모피즘",
    description: "환상적인 반투명 아크릴 블러와 은은한 광택",
    containerClass:
      "bg-gradient-to-tr from-[#0a0f1d] via-[#14162e] to-[#0a0f1d] text-white",
    cardClass:
      "bg-white/[0.06] backdrop-blur-xl text-white border border-white/[0.14] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.12] hover:border-white/30 transition-all",
    headerClass: "text-cyan-200/70 font-medium tracking-widest text-xs uppercase",
    socialBtnClass:
      "bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md shadow-sm transition-all",
    badgeClass: "bg-cyan-500/15 text-cyan-200 border border-cyan-500/30",
    avatarRingClass: "ring-2 ring-cyan-400/50 shadow-xl shadow-cyan-500/20",
    textColor: "text-white",
    mutedTextColor: "text-cyan-200/70",
    accentColor: "#06b6d4",
    previewBg: "bg-gradient-to-r from-slate-900 to-indigo-900",
  },
};
