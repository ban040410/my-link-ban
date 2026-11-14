import { dummyProfile, dummyLinks } from "@/data/links";
import { PublicProfileView } from "@/components/link-list/public-profile-view";
import type { Metadata } from "next";

interface PublicPageProps {
  params: Promise<{
    username: string;
  }>;
}

export function generateStaticParams() {
  return [
    { username: "@minwoo_dev" },
    { username: "minwoo_dev" },
  ];
}

export async function generateMetadata({
  params,
}: PublicPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const rawUsername = decodeURIComponent(resolvedParams.username || "");
  const cleanUsername = rawUsername.replace(/^@/, "");

  return {
    title: `${dummyProfile.displayName} (@${cleanUsername}) — MyLink`,
    description: dummyProfile.bio,
    openGraph: {
      title: `${dummyProfile.displayName} (@${cleanUsername})`,
      description: dummyProfile.bio,
      images: [dummyProfile.avatarUrl],
    },
  };
}

export default async function PublicProfilePage({ params }: PublicPageProps) {
  const resolvedParams = await params;
  const rawUsername = decodeURIComponent(resolvedParams.username || "");
  const cleanUsername = rawUsername.replace(/^@/, "");

  const userProfile = {
    ...dummyProfile,
    username: cleanUsername || dummyProfile.username,
  };

  return (
    <PublicProfileView
      profile={userProfile}
      links={dummyLinks}
      themeId={userProfile.themeId}
    />
  );
}
