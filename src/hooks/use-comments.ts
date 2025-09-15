import { useState, useEffect, useCallback, useRef } from 'react';
import { useLensAuthStore } from '@/stores/auth-store';
import { toast } from 'sonner';
import { AnyPost, PostReferenceType } from '@lens-protocol/client';
import { fetchPostReferences } from '@lens-protocol/client/actions';

interface UseCommentsProps {
  postId: string;
  autoFetch?: boolean;
  // Comment filtering options
  referenceTypes?: PostReferenceType[];
  byAuthors?: string[];
}

export function useComments({ 
  postId: commentPostId, 
  autoFetch = true, 
  referenceTypes = [PostReferenceType.CommentOn],
  byAuthors
}: UseCommentsProps) {
  const [comments, setComments] = useState<AnyPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageInfo, setPageInfo] = useState<{ next?: string } | null>(null);
  const { client, sessionClient } = useLensAuthStore();
  
  // Enhanced comment state for retry logic
  const currentCommentCount = useRef<number>(0);
  const expectingNewComment = useRef<boolean>(false);

  const fetchComments = useCallback(
    async (cursor?: string, isRefresh = false) => {
      if (!client || !commentPostId) return;
      
      try {
        if (isRefresh) {
          setLoading(true);
          setError(null);
        } else if (cursor) {
          // Loading more comments
          setLoading(true);
        } else {
          setLoading(true);
          setError(null);
        }
        
        // Use sessionClient if available for better data access
        const lensClient = sessionClient || client;
        const result = await fetchPostReferences(lensClient, {
          referencedPost: commentPostId,
          referenceTypes: referenceTypes,
          // Add author filtering if specified
          ...(byAuthors && byAuthors.length > 0 && { byAuthors }),
          // Add pagination
          ...(cursor && { cursor }),
        });

        if (result.isErr()) {
          throw new Error(result.error.message);
        }

        const { items, pageInfo: newPageInfo } = result.value;
        
        // Filter only comments (Posts)
        const commentItems = items.filter(item => item.__typename === 'Post') as AnyPost[];

        if (isRefresh || !cursor) {
          setComments(commentItems);
        } else {
          setComments(prev => [...prev, ...commentItems]);
        }

        setPageInfo({
          next: newPageInfo.next || undefined
        });
        setHasMore(!!newPageInfo.next);
        
        return commentItems.length;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch comments');
        console.error('Error fetching comments:', err);
      } finally {
        setLoading(false);
      }
    },
    [client, sessionClient, commentPostId, referenceTypes, byAuthors]
  );

  const loadMoreComments = useCallback(async () => {
    if (pageInfo?.next && !loading) {
      await fetchComments(pageInfo.next);
    }
  }, [pageInfo?.next, loading, fetchComments]);

  const refreshComments = useCallback(
    async (retryCount = 0, expectNew = false) => {
      // For comment posting, we don't need complex retry logic
      // Just refresh once and let the user see the result
      await fetchComments(undefined, true);
    },
    [fetchComments]
  );


  useEffect(() => {
    if (autoFetch && commentPostId) {
      fetchComments();
    }
  }, [autoFetch, commentPostId, fetchComments]);

  return {
    comments,
    loading,
    error,
    hasMore,
    pageInfo,
    fetchComments,
    loadMoreComments,
    refreshComments,
  };
}
