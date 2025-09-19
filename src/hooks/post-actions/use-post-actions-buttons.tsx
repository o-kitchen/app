"use client";

import { Post } from "@lens-protocol/client";
import { Heart, MessageCircle, Bookmark, Share2 } from "lucide-react";
import { JSXElementConstructor, ReactElement } from "react";
import { usePostActions } from "@/hooks/post-actions/use-post-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type ActionButtonConfig = {
  icon: any;
  label: string;
  initialCount: number;
  strokeColor: string;
  fillColor: string;
  isActive?: boolean;
  shouldIncrementOnClick: boolean;
  onClick?: () => Promise<any> | void;
  renderPopover?: (
    trigger: ReactElement<any, string | JSXElementConstructor<any>>,
  ) => ReactElement<any, string | JSXElementConstructor<any>>;
  isDisabled?: boolean;
  dropdownItems?: {
    icon: any;
    label: string;
    onClick: () => void;
  }[];
  hideCount?: boolean;
  isUserLoggedIn?: boolean;
  onConnectWallet?: () => void;
  onSelectProfile?: () => void;
};

type PostActionButtons = {
  likeButton: ActionButtonConfig;
  commentButton: ActionButtonConfig;
  bookmarkButton: ActionButtonConfig;
  shareButton: ActionButtonConfig;
};

export const usePostActionsButtons = ({
  post,
}: {
  post: Post;
}): PostActionButtons => {
  const router = useRouter();
  const t = useTranslations("post");
  const {
    //handleComment,
    handleBookmark,
    handleLike,
    //isCommentSheetOpen,
    stats,
    operations,
    isLoggedIn,
  } = usePostActions(post);

  const handleComment = () => {
    router.push(`/p/${post.id}`);
    /*
    // 延迟滚动到评论区域，确保页面已加载
    setTimeout(() => {
      const commentSection = document.getElementById('comment-section');
      if (commentSection) {
        commentSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 500);
    */
  };

  // Helper function to share post using Web Share API
  const handleShare = async () => {
    // Extract title from post metadata
    const title = "title" in post.metadata && typeof post.metadata.title === "string" && post.metadata.title.trim() !== ""
      ? post.metadata.title
      : "content" in post.metadata && typeof post.metadata.content === "string" && post.metadata.content.trim() !== ""
        ? post.metadata.content.substring(0, 50) + "..."
        : "Check out this post";

    // Extract text/description from post metadata
    const text = "content" in post.metadata && typeof post.metadata.content === "string" && post.metadata.content.trim() !== ""
      ? post.metadata.content.length > 100
        ? post.metadata.content.substring(0, 100) + "..."
        : post.metadata.content
      : title;

    // Generate post URL
    const postUrl = `${window.location.origin}/p/${post.id}`;

    try {
      await navigator.share({
        title: title,
        text: text,
        url: postUrl,
      });
    } catch (error) {
      // Handle user cancellation or other errors
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Share failed:', error);
        toast.error(t("shareError"));
      }
    }
  };

  const likes = stats.upvotes;
  const comments = stats.comments;
  const bookmarks = stats.bookmarks;

  const hasUpvoted = operations?.hasUpvoted;
  const hasBookmarked = operations?.hasBookmarked;

  const buttons: PostActionButtons = {
    likeButton: {
      icon: Heart,
      label: "Like",
      initialCount: likes,
      strokeColor: "rgb(239, 68, 68)", // red-500
      fillColor: "rgba(239, 68, 68, 0.9)",
      onClick: handleLike,
      isActive: hasUpvoted,
      shouldIncrementOnClick: true,
      isDisabled: false,
      isUserLoggedIn: isLoggedIn,
    },
    commentButton: {
      icon: MessageCircle,
      label: "Comment",
      initialCount: comments,
      strokeColor: "rgb(59, 130, 246)", // blue-500
      fillColor: "rgba(59, 130, 246, 0.8)",
      onClick: handleComment,
      shouldIncrementOnClick: false,
      //isActive: false,
      isDisabled: false,
      isUserLoggedIn: isLoggedIn,
    },
    bookmarkButton: {
      icon: Bookmark,
      label: "Bookmark",
      isActive: hasBookmarked,
      initialCount: bookmarks,
      strokeColor: "rgb(16, 185, 129)", // emerald-500
      fillColor: "rgba(16, 185, 129, 0.8)",
      shouldIncrementOnClick: true,
      onClick: handleBookmark,
      isDisabled: false,
      isUserLoggedIn: isLoggedIn,
    },
    shareButton: {
      icon: Share2,
      label: "Share",
      isActive: false,
      initialCount: 0,
      strokeColor: "rgb(107, 114, 128)", // gray-500
      fillColor: "rgba(107, 114, 128, 0.8)",
      shouldIncrementOnClick: false,
      onClick: handleShare,
      hideCount: true,
      isUserLoggedIn: isLoggedIn,
      isDisabled: false,
    },
  };

  return buttons;
};