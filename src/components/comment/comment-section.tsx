import React, { useState } from "react";
import { AnyPost } from "@lens-protocol/client";
import { post as createPost } from "@lens-protocol/client/actions";
import { handleOperationWith } from "@lens-protocol/client/viem";
import { textOnly } from "@lens-protocol/metadata";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Heart, Reply, MoreHorizontal } from "lucide-react";
import { resolveUrl } from "@/utils/resolve-url";
import { formatTimestamp } from "@/utils/post-helpers";
import { usePost } from "@/hooks/use-post";
import { usePostActions } from "@/hooks/post-actions/use-post-actions";
import { useLensAuthStore } from "@/stores/auth-store";
import { storageClient } from "@/lib/storage-client";
import { useWalletClient } from "wagmi";
import { toast } from "sonner";

interface CommentSectionProps {
  post: AnyPost;
  className?: string;
}

export function CommentSection({
  post,
  className = ""
}: CommentSectionProps) {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
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
  
  // Use the usePost hook to get comments and operations
  const { 
    comments, 
    commentsLoading, 
    operations, 
    isLoggedIn,
    refreshComments 
  } = usePost({ postId: post.id });

  // Get post actions for the main post (only if it's a Post)
  const { handleLike: handlePostLike, stats: postStats, operations: postOperations } = usePostActions(
    post.__typename === "Post" ? post : null as any
  );

  // Get auth and wallet client
  const { client, sessionClient } = useLensAuthStore();
  const { data: walletClient } = useWalletClient();

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return;
    
    if (!isLoggedIn) {
      toast.error("Please login to comment");
      return;
    }

    if (!walletClient) {
      toast.error("Please connect your wallet");
      return;
    }

    // Check if user can comment based on post operations
    if (!operations?.canComment) {
      toast.error("Commenting is not allowed on this post");
      return;
    }

    if (!sessionClient?.isSessionClient()) {
      toast.error("Please log in to comment");
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

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim() || isSubmitting) return;
    
    if (!isLoggedIn) {
      toast.error("Please login to reply");
      return;
    }

    if (!walletClient) {
      toast.error("Please connect your wallet");
      return;
    }

    // Check if user can comment based on post operations
    if (!operations?.canComment) {
      toast.error("Replying is not allowed on this post");
      return;
    }

    if (!sessionClient?.isSessionClient()) {
      toast.error("Please log in to reply");
      return;
    }

    setIsSubmitting(true);
    const pendingToast = toast.loading("Publishing reply...");

    try {
      // Create metadata for the reply
      const metadata = textOnly({
        content: replyContent.trim(),
      });

      // Upload metadata to storage
      const { uri } = await storageClient.uploadAsJson(metadata);

      // Create reply using Lens Protocol
      const result = await createPost(sessionClient, {
        contentUri: uri,
        commentOn: {
          post: commentId,
        },
      })
        .andThen(handleOperationWith(walletClient))
        .andThen(sessionClient.waitForTransaction);

      if (result.isErr()) {
        toast.dismiss(pendingToast);
        toast.error("Failed to publish reply", {
          description: result.error instanceof Error ? result.error.message : "An unknown error occurred",
        });
        console.error("Error publishing reply:", result.error);
        return;
      }

      toast.dismiss(pendingToast);
      toast.success("Reply published successfully!");
      
      setReplyContent("");
      setReplyTo(null);
      
      // Add a small delay to ensure the transaction is confirmed
      setTimeout(async () => {
        await refreshComments(0, true);
      }, 1000);
    } catch (error) {
      console.error('Failed to add reply:', error);
      toast.dismiss(pendingToast);
      toast.error("Failed to publish reply", {
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

  // Check if user can comment
  const canComment = operations?.canComment && isLoggedIn;

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
        {canComment && (
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
        )}
        
        {!canComment && (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            {!isLoggedIn ? "Please login to comment" : "Commenting is not allowed on this post"}
          </div>
        )}

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
            comments.map((comment) => {
              if (comment.__typename !== "Post") return null;
              
              return (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  onLike={() => {}} // TODO: Implement like functionality
                  onReply={() => setReplyTo(comment.id)}
                  showReplyInput={replyTo === comment.id}
                  replyContent={replyContent}
                  onReplyContentChange={setReplyContent}
                  onSubmitReply={() => handleSubmitReply(comment.id)}
                  onCancelReply={() => {
                    setReplyTo(null);
                    setReplyContent("");
                  }}
                  canComment={canComment}
                  isSubmitting={isSubmitting}
                />
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface CommentItemProps {
  comment: AnyPost;
  onLike: () => void;
  onReply: () => void;
  showReplyInput: boolean;
  replyContent: string;
  onReplyContentChange: (content: string) => void;
  onSubmitReply: () => void;
  onCancelReply: () => void;
  canComment: boolean;
  isSubmitting: boolean;
}

function CommentItem({
  comment,
  onLike,
  onReply,
  showReplyInput,
  replyContent,
  onReplyContentChange,
  onSubmitReply,
  onCancelReply,
  canComment,
  isSubmitting
}: CommentItemProps) {
  // Get post actions for this specific comment (only if it's a Post)
  const { handleLike, stats, operations, isLoggedIn } = usePostActions(
    comment.__typename === "Post" ? comment : null as any
  );
  
  const displayName = comment.author?.metadata?.name || 
                     comment.author?.username?.localName || 
                     "Anonymous";
  const avatar = comment.author?.metadata?.picture ? 
                 resolveUrl(comment.author.metadata.picture) : 
                 "/gull.jpg";

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={avatar} />
          <AvatarFallback className="text-xs">
            {displayName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                {displayName}
              </span>
              <Badge variant="outline" className="text-xs">
                {formatTimestamp(comment.timestamp)}
              </Badge>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {comment.__typename === "Post" && "content" in comment.metadata && comment.metadata.content}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <button
                onClick={handleLike}
                disabled={!isLoggedIn}
                className={`flex items-center gap-1 transition-colors ${
                  operations?.hasUpvoted 
                    ? "text-red-500 dark:text-red-400" 
                    : "hover:text-red-500 dark:hover:text-red-400"
                } ${!isLoggedIn ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Heart className={`w-3 h-3 ${operations?.hasUpvoted ? "fill-current" : ""}`} />
                {stats?.upvotes || 0}
              </button>
              {canComment && (
                <button
                  onClick={onReply}
                  className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <Reply className="w-3 h-3" />
                  Reply
                </button>
              )}
              <button className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                <MoreHorizontal className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reply Input */}
      {showReplyInput && canComment && (
        <div className="ml-11 space-y-3">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => onReplyContentChange(e.target.value)}
            disabled={isSubmitting}
            className="min-h-[60px] resize-none text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="flex gap-2">
            <Button 
              size="sm"
              onClick={onSubmitReply}
              disabled={!replyContent.trim() || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Reply"}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={onCancelReply}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
