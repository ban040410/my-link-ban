export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 text-center">
        {/* 프로필 아바타 */}
        <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-3xl font-bold text-white shadow-md">
          반
        </div>

        {/* 이름 */}
        <h1 className="text-2xl font-bold tracking-tight">반기완</h1>

        {/* 소개 태그 */}
        <span className="mt-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/60 dark:text-blue-300">
          주니어 개발자 · Software Engineer
        </span>

        {/* 소개글 */}
        <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 break-keep">
          안녕하세요! 문제를 해결하고 가치 있는 서비스를 만들어가는 개발자 반기완입니다. 새로운 기술을 배우고 더 나은 사용자 경험을 고민하는 것을 좋아합니다.
        </p>
      </div>
    </main>
  );
}
