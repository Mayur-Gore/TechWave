import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import { BookOpen, Clock, UserCheck } from 'lucide-react';

export default function LearningHubModal({ article, isOpen, onClose }) {
  if (!article) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={article.title}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 pt-1">
        {/* Meta badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-600 pb-3 border-b border-gray-100">
          <Badge variant="primary" icon={BookOpen}>
            {article.category}
          </Badge>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
            <span>{article.readTime}</span>
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <UserCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            <span>{article.author}</span>
          </span>
        </div>

        {/* Lead Excerpt */}
        <div className="p-3.5 bg-primary-light/50 rounded-xl border border-primary/20 text-sm font-medium text-primary-dark">
          {article.excerpt}
        </div>

        {/* Article Body */}
        <div className="text-sm text-gray-700 space-y-3 leading-relaxed whitespace-pre-line font-normal">
          {article.content}
        </div>

        {/* Disclaimer footer */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Demonstration farmer extension material</span>
          <button
            type="button"
            onClick={onClose}
            className="text-primary font-semibold hover:underline"
          >
            Close Guide
          </button>
        </div>
      </div>
    </Modal>
  );
}
