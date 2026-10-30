import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  MapPin,
  Edit2,
  Trash2,
  Send
} from 'lucide-react';

import Card from '../ui/Card';
import Badge from '../ui/Badge';
import PillButton from '../ui/PillButton';

export default function PostCard({
  post,
  currentUser,
  onToggleLike,
  onAddComment,
  onEdit,
  onDelete,
}) {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');

  const isAuthor = post.authorId === currentUser.id;
  const isLiked = post.likedBy?.includes(currentUser.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onAddComment(post.id, commentInput.trim());
    setCommentInput('');
  };

  const getTagVariant = (t) => {
    switch (t) {
      case 'Success Story':
        return 'success';
      case 'Advice':
        return 'primary';
      case 'Machinery Tip':
        return 'amber';
      case 'Question':
        return 'info';
      default:
        return 'default';
    }
  };

  const initials = post.authorName
    ? post.authorName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'SH';

  return (
    <Card className="p-4 sm:p-6 border-gray-200/90 shadow-card space-y-4">
      {/* Post Author Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold text-sm flex items-center justify-center shrink-0 border border-primary/20">
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-bold text-gray-900 text-sm sm:text-base">
                {post.authorName}
              </span>
              {isAuthor && (
                <span className="text-[10px] bg-primary text-white font-bold px-2 py-0.5 rounded-full">
                  You
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" aria-hidden="true" />
                <span>{post.authorVillage}</span>
              </span>
              <span>•</span>
              <span>{post.authorRole || 'Farmer'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={getTagVariant(post.tag)} size="sm">
            {post.tag}
          </Badge>

          {/* Author Edit / Delete controls */}
          {isAuthor && (
            <div className="flex items-center gap-1 ml-1">
              <button
                type="button"
                onClick={() => onEdit(post)}
                aria-label="Edit your post"
                className="p-1.5 text-gray-400 hover:text-primary rounded-full hover:bg-gray-100 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(post.id)}
                aria-label="Delete your post"
                className="p-1.5 text-gray-400 hover:text-danger rounded-full hover:bg-gray-100 min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Text Content - Cleanly Escaped */}
      <p className="text-sm sm:text-base text-gray-800 leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      {/* Optional attached image */}
      {post.imageUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-200 max-h-80 bg-gray-50">
          <img
            src={post.imageUrl}
            alt="Field attachment"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Likes and Comments Bar */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => onToggleLike(post.id)}
            aria-label={isLiked ? 'Unlike post' : 'Like post'}
            className={`flex items-center gap-1.5 font-semibold transition-colors min-h-[40px] px-2 rounded-lg ${
              isLiked ? 'text-danger' : 'text-gray-600 hover:text-danger'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? 'fill-danger text-danger' : ''}`}
              aria-hidden="true"
            />
            <span>{post.likesCount || 0}</span>
            <span className="hidden sm:inline">Likes</span>
          </button>

          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            aria-expanded={showComments}
            className="flex items-center gap-1.5 font-medium hover:text-primary transition-colors min-h-[40px] px-2 rounded-lg"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>{post.comments?.length || 0}</span>
            <span className="hidden sm:inline">Comments</span>
          </button>
        </div>

        <span className="text-xs text-gray-400">
          {new Date(post.createdAt).toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Expandable Comments Drawer */}
      {showComments && (
        <div className="pt-3 border-t border-gray-100 space-y-3 animate-in fade-in">
          {/* Add Comment Input Form */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <label htmlFor={`comment-input-${post.id}`} className="sr-only">
              Add a comment
            </label>
            <input
              id={`comment-input-${post.id}`}
              type="text"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Write an encouraging reply or tip..."
              className="flex-1 min-h-[40px] px-3.5 py-1.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-pill focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
            <PillButton
              type="submit"
              variant="primary"
              size="sm"
              icon={Send}
              disabled={!commentInput.trim()}
              ariaLabel="Submit comment"
            >
              Reply
            </PillButton>
          </form>

          {/* Comments List */}
          <div className="space-y-2 pt-1 max-h-60 overflow-y-auto">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-semibold text-gray-900">
                    <span>{comment.authorName}</span>
                    <span className="text-[10px] text-gray-400 font-normal">
                      {new Date(comment.createdAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed font-normal">
                    {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400 italic py-1 text-center">
                No comments yet. Be the first to share your view!
              </p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
