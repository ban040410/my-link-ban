import { LinkItem, UserProfile } from "@/types/link";

/**
 * 마이링크 (MyLink) 기본 프로필 더미 데이터
 */
export const dummyProfile: UserProfile = {
  id: "user_01_creator",
  username: "minwoo_dev",
  displayName: "민우 (Minwoo Kim)",
  bio: "디자인과 코딩을 넘나드는 프론트엔드 엔지니어 & 크리에이터입니다. 매주 인터랙티브 웹 디자인 팁을 공유합니다. ✨",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  themeId: "dark-canvas",
  socialLinks: [
    {
      id: "soc_1",
      platform: "github",
      url: "https://github.com",
      position: 1,
    },
    {
      id: "soc_2",
      platform: "youtube",
      url: "https://youtube.com",
      position: 2,
    },
    {
      id: "soc_3",
      platform: "instagram",
      url: "https://instagram.com",
      position: 3,
    },
    {
      id: "soc_4",
      platform: "mail",
      url: "mailto:minwoo@example.com",
      position: 4,
    },
  ],
};

/**
 * 마이링크 (MyLink) 링크 및 콘텐츠 블록 더미 데이터
 * - 일반 웹 링크 (아이콘, 클릭수 포함)
 * - 섹션 헤더 블록
 * - 미디어 임베드 블록 (유튜브)
 * - 활성화(isActive: true) 및 비활성화(isActive: false) 샘플 포함
 */
export const dummyLinks: LinkItem[] = [
  {
    id: "link-01",
    type: "link",
    title: "⚡ 2026 포트폴리오 노션 웹사이트",
    url: "https://notion.so/portfolio-sample",
    icon: "Sparkles",
    isActive: true,
    position: 1,
    clickCount: 1420,
    createdAt: "2026-11-01T09:00:00Z",
  },
  {
    id: "link-02",
    type: "link",
    title: "🚀 사이드 프로젝트: AI 영감 노트 (Beta)",
    url: "https://example.com/ai-notes",
    icon: "Globe",
    isActive: true,
    position: 2,
    clickCount: 890,
    createdAt: "2026-11-03T11:20:00Z",
  },
  {
    id: "link-03",
    type: "header",
    title: "FEATURED VIDEO",
    isActive: true,
    position: 3,
    clickCount: 0,
    createdAt: "2026-11-05T14:00:00Z",
  },
  {
    id: "link-04",
    type: "embed",
    title: "유튜브: Next.js 16과 shadcn/ui로 3분 만에 모바일 웹 만들기",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    embedType: "youtube",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isActive: true,
    position: 4,
    clickCount: 532,
    createdAt: "2026-11-06T18:30:00Z",
  },
  {
    id: "link-05",
    type: "header",
    title: "TECH & WRITING",
    isActive: true,
    position: 5,
    clickCount: 0,
    createdAt: "2026-11-08T10:00:00Z",
  },
  {
    id: "link-06",
    type: "link",
    title: "기술 블로그: React 19와 최신 디자인 시스템 탐구",
    url: "https://velog.io/@sample",
    icon: "BookOpen",
    isActive: true,
    position: 6,
    clickCount: 412,
    createdAt: "2026-11-09T13:40:00Z",
  },
  {
    id: "link-07",
    type: "link",
    title: "깃허브(GitHub) 오픈소스 저장소 구경하기",
    url: "https://github.com/sample",
    icon: "Github",
    isActive: true,
    position: 7,
    clickCount: 328,
    createdAt: "2026-11-10T16:10:00Z",
  },
  {
    id: "link-08",
    type: "header",
    title: "CONNECT & CHAT",
    isActive: true,
    position: 8,
    clickCount: 0,
    createdAt: "2026-11-11T08:00:00Z",
  },
  {
    id: "link-09",
    type: "link",
    title: "☕ 1:1 커피챗 / 멘토링 신청하기",
    url: "https://open.kakao.com/sample",
    icon: "Mail",
    isActive: true,
    position: 9,
    clickCount: 195,
    createdAt: "2026-11-12T09:15:00Z",
  },
  {
    id: "link-10",
    type: "link",
    title: "🛍️ 개발자 굿즈 스토어 (준비 중)",
    url: "https://smartstore.naver.com/sample",
    icon: "ShoppingBag",
    isActive: false, // 비활성화 테스트용 링크
    position: 10,
    clickCount: 42,
    createdAt: "2026-11-13T15:00:00Z",
  },
];
