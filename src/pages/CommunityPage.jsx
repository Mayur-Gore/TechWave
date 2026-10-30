import { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  Flame,
  Clock,
  MessageSquare,
  Search
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PillButton from '../components/ui/PillButton';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { PostCardSkeleton } from '../components/ui/Skeleton';

import PostCard from '../components/feature/PostCard';
import PostComposerModal from '../components/feature/PostComposerModal';
import { useApp } from '../context/AppContext';
import { POST_TAGS } from '../data/seedPosts';

export default function CommunityPage() {
  const {
    posts,
    currentUser,
    createPost,
    updatePost,
    deletePost,
    togglePostLike,
    addPostComment,
    t,
  } = useApp();

  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' or 'popular'
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);

  // Simulated ~400ms loading
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [selectedTag, sortBy]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (selectedTag !== 'All' && p.tag !== selectedTag) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const contentMatch = p.content.toLowerCase().includes(q);
        const authorMatch = p.authorName?.toLowerCase().includes(q);
        const villageMatch = p.authorVillage?.toLowerCase().includes(q);
        if (!contentMatch && !authorMatch && !villageMatch) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.likesCount || 0) - (a.likesCount || 0);
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [posts, selectedTag, sortBy, searchQuery]);

  const handleOpenCreate = () => {
    setEditingPost(null);
    setIsComposerOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingPost(post);
    setIsComposerOpen(true);
  };

  const handleComposerSubmit = (postData) => {
    if (editingPost) {
      updatePost(postData);
    } else {
      createPost(postData);
    }
  };

  const handleConfirmDelete = () => {
    if (deletePostId) {
      deletePost(deletePostId);
      setDeletePostId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={t.nav.community}
        subtitle="Peer-to-peer farmer forum for Maharashtra agri communities. Exchange field tips, machinery advice, and celebrate agricultural milestones."
        action={
          <PillButton
            variant="primary"
            icon={Plus}
            onClick={handleOpenCreate}
            size="md"
          >
            Create Post / पोस्ट लिहा
          </PillButton>
        }
      />

      {/* Filter and Sort Toolbar */}
      <Card className="p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by topic, harvest experience, or farmer..."
              aria-label="Search community posts"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-pill border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Sort Buttons: Latest vs Popular */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-pill shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setSortBy('latest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors min-h-[36px] ${
                sortBy === 'latest'
                  ? 'bg-white text-primary shadow-xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Latest</span>
            </button>
            <button
              type="button"
              onClick={() => setSortBy('popular')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold transition-colors min-h-[36px] ${
                sortBy === 'popular'
                  ? 'bg-white text-primary shadow-xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>Most Popular</span>
            </button>
          </div>
        </div>

        {/* Tag Filters */}
        <div className="pt-2 border-t border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {POST_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`min-h-[36px] px-3.5 py-1 text-xs font-medium rounded-pill whitespace-nowrap transition-colors ${
                selectedTag === tag
                  ? 'bg-primary text-white shadow-xs font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>

      {/* Feed List */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No posts found in this topic"
          description="Be the first farmer to share a tip, question, or farm update with the community."
          actionText="Create Post Now"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onToggleLike={togglePostLike}
              onAddComment={addPostComment}
              onEdit={handleOpenEdit}
              onDelete={setDeletePostId}
            />
          ))}
        </div>
      )}

      {/* Composer Modal */}
      <PostComposerModal
        isOpen={isComposerOpen}
        onClose={() => {
          setIsComposerOpen(false);
          setEditingPost(null);
        }}
        onSubmit={handleComposerSubmit}
        initialPost={editingPost}
      />

      {/* Delete Post Confirm Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletePostId)}
        onClose={() => setDeletePostId(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Community Post?"
        message="Are you sure you want to remove this post? It will be permanently removed from the community feed."
        confirmText="Yes, Delete Post"
        cancelText="Cancel"
      />
    </div>
  );
}
