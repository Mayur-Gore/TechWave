import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import PillButton from '../ui/PillButton';
import { Upload, X, AlertCircle } from 'lucide-react';

import { compressImage } from '../../utils/imageCompressor';
import { POST_TAGS } from '../../data/seedPosts';

const MAX_CHARS = 500;

export default function PostComposerModal({
  isOpen,
  onClose,
  onSubmit,
  initialPost = null,
}) {
  const isEdit = Boolean(initialPost);

  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Advice');
  const [image, setImage] = useState('');
  const [imageError, setImageError] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialPost) {
      setContent(initialPost.content || '');
      setTag(initialPost.tag || 'Advice');
      setImage(initialPost.imageUrl || '');
    } else {
      setContent('');
      setTag('Advice');
      setImage('');
    }
    setError('');
    setImageError('');
  }, [initialPost, isOpen]);

  const handleImageChange = async (e) => {
    setImageError('');
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const result = await compressImage(file);
    setIsCompressing(false);

    if (result.success) {
      setImage(result.data);
    } else {
      setImageError(result.error || 'Failed to process image.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please write your post content before publishing.');
      return;
    }
    if (content.length > MAX_CHARS) {
      setError(`Post exceeds maximum character limit of ${MAX_CHARS}.`);
      return;
    }

    onSubmit({
      ...(initialPost || {}),
      content: content.trim(),
      tag,
      imageUrl: image,
    });

    onClose();
  };

  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Community Post' : 'Share with Shetkari Community'}
      description="Connect with farmers across Maharashtra. Share experiences, harvest tips, machinery insights or ask field questions."
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4 pt-1">
        {/* Category Tag Selector */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Post Topic Tag
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {POST_TAGS.filter((t) => t !== 'All').map((tName) => (
              <button
                key={tName}
                type="button"
                onClick={() => setTag(tName)}
                className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-pill transition-colors ${
                  tag === tName
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tName}
              </button>
            ))}
          </div>
        </div>

        {/* Content with live 500-char counter */}
        <div className="space-y-1.5">
          <label htmlFor="post-content" className="block text-sm font-medium text-gray-700">
            Your Post / अनुभव किंवा प्रश्न <span className="text-danger">*</span>
          </label>
          <textarea
            id="post-content"
            rows={4}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              if (error) setError('');
            }}
            placeholder="Share your harvest yield, organic pest control recipe, tractor implement performance, or ask a farming question..."
            className={`w-full p-3.5 rounded-xl border text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
              isOverLimit || error ? 'border-danger focus:ring-danger' : 'border-gray-300'
            }`}
          />

          <div className="flex items-center justify-between text-xs">
            {error ? (
              <span role="alert" className="text-danger font-medium">{error}</span>
            ) : (
              <span className="text-gray-400">Keep discussions helpful and supportive</span>
            )}
            <span
              className={`font-mono font-medium ${
                isOverLimit ? 'text-danger font-bold' : charCount >= 450 ? 'text-amber-600' : 'text-gray-500'
              }`}
            >
              {charCount} / {MAX_CHARS}
            </span>
          </div>
        </div>

        {/* Optional Image */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Attach Field Photo (Optional, Max 1MB)
          </label>
          {image ? (
            <div className="relative w-32 h-24 rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
              <img src={image} alt="Field preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setImage('')}
                className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-danger transition-colors"
                aria-label="Remove attached photo"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors w-fit text-xs font-medium text-gray-700">
              <Upload className="w-4 h-4 text-gray-400" aria-hidden="true" />
              <span>{isCompressing ? 'Compressing under 200KB...' : 'Upload Field Photo'}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={isCompressing}
                className="sr-only"
              />
            </label>
          )}

          {imageError && (
            <p role="alert" className="text-xs text-danger font-medium flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{imageError}</span>
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <PillButton variant="ghost" onClick={onClose} disabled={isCompressing}>
            Cancel
          </PillButton>
          <PillButton type="submit" variant="primary" loading={isCompressing} disabled={isOverLimit}>
            {isEdit ? 'Save Changes' : 'Publish to Feed'}
          </PillButton>
        </div>
      </form>
    </Modal>
  );
}
