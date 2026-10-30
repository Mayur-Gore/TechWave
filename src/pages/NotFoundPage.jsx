import { Link } from 'react-router-dom';
import { Sprout, Home } from 'lucide-react';
import PillButton from '../components/ui/PillButton';

export default function NotFoundPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="text-center max-w-md mx-auto space-y-6">
        <div className="w-20 h-20 bg-primary-light text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Sprout className="w-10 h-10" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary-light px-2.5 py-1 rounded-pill">
            404 Error
          </span>
          <h1 className="text-3xl font-heading font-bold text-gray-900">
            Page Not Found / पृष्ठ सापडले नाही
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            The page you are looking for does not exist or has been moved. Let&apos;s return to the farm homepage.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <PillButton variant="primary" icon={Home}>
              Return to Farm Home
            </PillButton>
          </Link>
          <Link to="/marketplace">
            <PillButton variant="outline">
              Explore Marketplace
            </PillButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
