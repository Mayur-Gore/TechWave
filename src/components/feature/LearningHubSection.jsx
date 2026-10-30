import { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import LearningHubModal from './LearningHubModal';
import { seedArticles } from '../../data/seedArticles';

export default function LearningHubSection({ t }) {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <section aria-labelledby="learning-hub-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2
            id="learning-hub-heading"
            className="text-xl sm:text-2xl font-heading font-bold text-gray-900"
          >
            {t.home.learningHubSection}
          </h2>
          <p className="text-sm text-gray-600">
            {t.home.learningHubDesc}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {seedArticles.map((article) => (
          <Card
            key={article.id}
            hoverable
            className="flex flex-col justify-between cursor-pointer border border-gray-100 transition-all hover:border-primary/40"
            onClick={() => setSelectedArticle(article)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="primary" icon={BookOpen} size="sm">
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{article.readTime}</span>
                </span>
              </div>

              <h3 className="font-heading font-semibold text-gray-900 text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                {article.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </div>
          </Card>
        ))}
      </div>

      <LearningHubModal
        article={selectedArticle}
        isOpen={Boolean(selectedArticle)}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}
