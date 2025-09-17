import { useState, useEffect, useCallback, useRef } from "react";
import { PageSize, Post, AnyPost } from "@lens-protocol/client";
import { fetchPosts } from "@lens-protocol/client/actions";
import { useSharedPostActions } from "@/contexts/post-actions-context";
import { useLensAuthStore } from "@/stores/auth-store";
import { useFeedContext } from "@/contexts/feed-context";
import { evmAddress } from "@lens-protocol/client";
import { env } from "@/lib/env";

// Helper function to filter out comments and replies
export function isValidArticlePost(post: AnyPost): boolean {
  return (
    post.__typename === "Post" &&
    // Check if it's not a comment or reply by ensuring it doesn't have root reference. Main posts don't have a root (they are not comments on other posts)
    //!post.root &&
    // 检查是否是评论：评论会有 commentOn 字段
    !post.commentOn &&
    // 确保是我方帖子
    post.app?.address === evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)
    // 确保有元数据
    //post.metadata?.__typename !== undefined
  );
}

type FeedType = "global" | "profile" | "custom";

interface useFeedOptions {
  type?: FeedType;
  profileAddress?: string;
  customFilter?: any;
}


export function useFeed(options: useFeedOptions = {}) {
  const { type = "global", profileAddress, customFilter } = options;
  
  // Auth and client
  const { client, sessionClient, currentProfile, loading: authStoreLoading } = useLensAuthStore();

  // Feed context for viewMode
  const { viewMode } = useFeedContext();

  // Post actions context
  const { 
    initPostState
  } = useSharedPostActions();
  
  // Feed state
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [newPostsAvailable, setNewPostsAvailable] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [paginationInfo, setPaginationInfo] = useState<{ next?: string | null } | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Refs for polling
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastPostIdRef = useRef<string | null>(null);
  
  const isLoggedIn = !!currentProfile && !authStoreLoading;
  const isAuthReady = !authStoreLoading;
  
  // Helper functions
  const getFilter = useCallback(() => {
    if (type === "global") {
      return { apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)], };
    } else if (type === "profile" && profileAddress) {
      return { authors: [profileAddress] };
    } else if (type === "custom" && customFilter) {
      return customFilter;
    }
    return { feeds: [{ globalFeed: true }] };
  }, [type, profileAddress, customFilter]);



  // Feed operations
  const loadPostsFromLens = useCallback(async (isRefresh = false, cursor?: string) => {
    // Client should always be available for public posts
    if (!client) return;
    
    try {
      if (isRefresh) setRefreshing(true);
      else if (cursor) setLoadingMore(true);
      else setLoading(true);
      setError(null);
      
      const filter = type === "global" 
        ? { apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] }
        : { ...getFilter(), apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] };
        
      const result = await fetchPosts(sessionClient || client, {
        filter,
        pageSize: PageSize.Fifty,
        cursor,
      });
      
      if (result.isErr()) {
        setError(result.error.message || "Failed to fetch posts");
        return;
      }
      
      const { items, pageInfo } = result.value;
      
      // Filter out comments and replies, keep only main posts
      const filteredPosts = items
        .filter(isValidArticlePost) as Post[];

      // Initialize post states for actions
      filteredPosts.forEach(post => {
        initPostState(post);
      });
      
      if (filteredPosts.length > 0) {
        lastPostIdRef.current = filteredPosts[0].id;
      }
      
      setPaginationInfo(pageInfo);
      
      if (isRefresh) {
        setPosts(filteredPosts);
        setLastRefreshTime(new Date());
      } else if (cursor) {
        // 去重逻辑：过滤掉已存在的帖子
        setPosts(prev => {
          const existingIds = new Set(prev.map(post => post.id));
          const newPosts = filteredPosts.filter(post => !existingIds.has(post.id));
          return [...prev, ...newPosts];
        });
      } else {
        setPosts(filteredPosts);
        setLastRefreshTime(new Date());
      }
      
      setNewPostsAvailable(false);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [client, sessionClient, getFilter, initPostState, type]);

  const checkForNewPosts = useCallback(async () => {
    // Client should always be available for public posts
    if (!client) return;

    try {
      const filter = type === "global" 
        ? { apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] }
        : { ...getFilter(), apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] };
        
      const result = await fetchPosts(sessionClient || client, {
        filter,
      });
      if (result.isErr()) return;
      
      const { items } = result.value;
      // Filter out comments and replies, keep only main posts
      const filteredPosts = items
        .filter(item => item.__typename === 'Post')
        .filter(isValidArticlePost) as Post[];
      if (filteredPosts.length > 0 && filteredPosts[0].id !== lastPostIdRef.current) {
        setNewPostsAvailable(true);
      }
    } catch {}
  }, [client, sessionClient, getFilter, type]);

  const handleRefresh = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    loadPostsFromLens(true);
  }, [loadPostsFromLens]);

  const handleLoadMore = useCallback(() => {
    if (paginationInfo?.next && !loadingMore) {
      loadPostsFromLens(false, paginationInfo.next);
    }
  }, [paginationInfo?.next, loadingMore, loadPostsFromLens]);

  const handleLoadNewPosts = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    setNewPostsAvailable(false);
    loadPostsFromLens(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [loadPostsFromLens]);

  // Initialize feed
  useEffect(() => {
    
    // Client should always be available for public posts
    if (!client) return;
    
    if (!isAuthReady) return;
    
    // Reset posts when filter changes
    setPosts([]);
    setLoading(true);
    setError(null);
    setPaginationInfo(null);
    
    const initializeAndLoadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const filter = type === "global" 
          ? { apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] }
          : { ...getFilter(), apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] };
          
        const result = await fetchPosts(sessionClient || client, {
          filter,
          pageSize: PageSize.Fifty,
        });
        
        if (result.isErr()) {
          setError(result.error.message || "Failed to fetch posts");
          return;
        }
        
        const { items, pageInfo } = result.value;
        
        // Filter out comments and replies, keep only main posts
        const filteredPosts = items
        .filter(isValidArticlePost) as Post[];

        // Initialize post states for actions
        filteredPosts.forEach(post => {
          initPostState(post);
        });
        
        if (filteredPosts.length > 0) {
          lastPostIdRef.current = filteredPosts[0].id;
        }
        
        setPaginationInfo(pageInfo);
        setPosts(filteredPosts);
        setLastRefreshTime(new Date());
        setNewPostsAvailable(false);
      } catch (err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    
    initializeAndLoadPosts();
    
    // Set up polling for new posts
    const pollForNewPosts = async () => {
      if (!client) return;

      try {
        const filter = type === "global" 
          ? { apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] }
          : { ...getFilter(), apps: [evmAddress(env.NEXT_PUBLIC_APP_ADDRESS_TESTNET)] };
          
        const result = await fetchPosts(sessionClient || client, {
          filter,
        });
        if (result.isErr()) return;
        
        const { items } = result.value;
        // Filter out comments and replies, keep only main posts
        const filteredPosts = items
          .filter(item => item.__typename === 'Post')
          .filter(isValidArticlePost) as Post[];
        if (filteredPosts.length > 0 && filteredPosts[0].id !== lastPostIdRef.current) {
          setNewPostsAvailable(true);
        }
      } catch {}
    };
    
    intervalRef.current = setInterval(pollForNewPosts, 45000);
    
    const handleFocus = () => {
      const timeSinceLastRefresh = Date.now() - lastRefreshTime.getTime();
      if (timeSinceLastRefresh > 120000) { // 2 minutes
        pollForNewPosts();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener('focus', handleFocus);
    };
  }, [client, sessionClient, isAuthReady, type, profileAddress, customFilter, viewMode]);

  // 计算是否还有更多数据
  const hasMore = !!(paginationInfo?.next && paginationInfo.next !== null);

  // Feed interface
  return {
    // Feed state
    posts,
    loading,
    error,
    hasMore,
    loadingMore,
    refreshing,
    newPostsAvailable,
    lastRefreshTime,
    
    // Feed actions
    handleRefresh,
    handleLoadMore,
    handleLoadNewPosts,
    
    // State
    isLoggedIn,
  };
}