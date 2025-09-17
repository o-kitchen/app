import React, { useState } from "react";
import { AnyPost, evmAddress } from "@lens-protocol/client";
import { post as createPost } from "@lens-protocol/client/actions";
import { handleOperationWith } from "@lens-protocol/client/viem";
import { textOnly } from "@lens-protocol/metadata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { useComments } from "@/hooks/use-comments";
import { usePostActions } from "@/hooks/post-actions/use-post-actions";
import { useSharedPostActions } from "@/contexts/post-actions-context";
import { useLensAuthStore } from "@/stores/auth-store";
import { storageClient } from "@/lib/storage-client";
import { useWalletClient } from "wagmi";
import { toast } from "sonner";
import { CommentView } from "./comment-view";

interface CommentSectionProps {
  post: AnyPost;
  className?: string;
}

export function CommentSection({
  post,
  className = ""
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Early return if post is null or undefined
  if (!post) {
    return (
      <div className={className}>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>Post not available</p>
        </div>
      </div>
    );
  }
  
  // Use the useComments hook to get comments
  const { 
    comments, 
    loading: commentsLoading, 
    refreshComments 
  } = useComments({ postId: post.id });

  // Get post actions for the main post (only if it's a Post)
  const { operations, isLoggedIn } = usePostActions(
    post.__typename === "Post" ? post : null
  );

  // Get shared post actions context for canComment logic
  const { getPostState, initPostState } = useSharedPostActions();
  
  // Initialize post state if it's a Post
  React.useEffect(() => {
    if (post.__typename === "Post") {
      initPostState(post);
    }
  }, [post, initPostState]);
  
  const postState = post.__typename === "Post" ? getPostState(post.id) : undefined;
  const canComment = postState?.operations?.canComment ?? false;

  // Get auth and wallet client
  const { sessionClient } = useLensAuthStore();
  const { data: walletClient } = useWalletClient();

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    if(!sessionClient?.isSessionClient()) {
      toast.error("Please connect your wallet");
      return;
    }

    // Check if user can comment based on post operations from context
    if (!canComment) {
      toast.error("Commenting is not allowed on this post");
      return;
    }

    setIsSubmitting(true);
    const pendingToast = toast.loading("Publishing comment...");

    try {
      // Create metadata for the comment
      const metadata = textOnly({
        content: newComment.trim(),
      });

      // Upload metadata to storage
      const { uri } = await storageClient.uploadAsJson(metadata);

      // Create comment using Lens Protocol
      const result = await createPost(sessionClient, {
        contentUri: uri,
        commentOn: {
          post: post.id,
        },
        feed: evmAddress("0xd74a3C23DB0BFEA48007BeA447a5D20C422242fb")//o-kitchen works-feed for uploading fanworks on o-kitchen
      })
        .andThen(handleOperationWith(walletClient))
        .andThen(sessionClient.waitForTransaction);

      if (result.isErr()) {
        toast.dismiss(pendingToast);
        toast.error("Failed to publish comment", {
          description: result.error instanceof Error ? result.error.message : "An unknown error occurred",
        });
        console.error("Error publishing comment:", result.error);
        return;
      }

      toast.dismiss(pendingToast);
      toast.success("Comment published successfully!");
      
      setNewComment("");
      
      // Add a small delay to ensure the transaction is confirmed
      setTimeout(async () => {
        await refreshComments(0, true);
      }, 1000);
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.dismiss(pendingToast);
      toast.error("Failed to publish comment", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Input */}
        <div className="space-y-3">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSubmitting}
            className="min-h-[80px] resize-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="flex justify-end">
            <Button 
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Posting..." : "Comment"}
            </Button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {commentsLoading ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Loading comments...</p>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <CommentView
                key={comment.id}
                comment={comment}
                nestingLevel={1}
                maxNestingLevel={4}
                autoShowReplies={false}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}



