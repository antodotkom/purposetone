import type { ReactNode } from "react";
import { NativeAdCard } from "@/components/ads/AdBanner";
import { PostCard } from "@/components/posts/PostCard";
import type { PurposePost } from "@/lib/types";

export function PostGrid({
  posts,
  nativeEvery = 0,
  nativeSlotId = "posts-grid-native-4",
}: {
  posts: PurposePost[];
  nativeEvery?: number;
  nativeSlotId?: string;
}) {
  const items: ReactNode[] = [];
  posts.forEach((post, index) => {
    items.push(<PostCard key={post.id} post={post} />);
    if (nativeEvery > 0 && (index + 1) % nativeEvery === 0) {
      items.push(
        <NativeAdCard key={`ad-${post.id}-${index}`} slotId={nativeSlotId} />,
      );
    }
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items}</div>
  );
}
