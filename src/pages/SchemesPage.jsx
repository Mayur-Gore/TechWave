import { useState, useMemo } from 'react';
import {
  Landmark,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PillButton from '../components/ui/PillButton';
import Badge from '../components/ui/Badge';
import Tabs from '../components/ui/Tabs';
import EmptyState from '../components/ui/EmptyState';
import SchemeApplicationModal from '../components/feature/SchemeApplicationModal';

import { useApp } from '../context/AppContext';
import { seedSchemes, SCHEME_CATEGORIES, SCHEME_LEVELS } from '../data/seedSchemes';

export default function SchemesPage() {
  const { applications, applyForScheme, refreshSchemeStatus, currentUser, t } = useApp();

  const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'applications'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal state
  const [applyingScheme, setApplyingScheme] = useState(null);

  const tabsConfig = [
    { id: 'browse', label: 'Explore Schemes (10+)', icon: Landmark, count: seedSchemes.length },
    { id: 'applications', label: t.common.myApplications, icon: Layers, count: applications.length },
  ];

  // Filtering schemes
  const filteredSchemes = useMemo(() => {
    return seedSchemes.filter((scheme) => {
      if (selectedLevel !== 'All' && scheme.level !== selectedLevel) {
        return false;
      }
      if (selectedCategory !== 'All' && scheme.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = scheme.name.toLowerCase().includes(q);
        const benefitMatch = scheme.shortBenefit.toLowerCase().includes(q);
        const eligMatch = scheme.eligibility.toLowerCase().includes(q);
        if (!nameMatch && !benefitMatch && !eligMatch) return false;
      }
      return true;
    });
  }, [searchQuery, selectedLevel, selectedCategory]);

  const handleApplySubmit = (appData) => {
    applyForScheme(appData);
    setActiveTab('applications');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.nav.schemes}
        subtitle="Central and Maharashtra state agricultural welfare initiatives, DBT subsidies, solar pump grants, and crop insurance schemes."
        badge={
          <Badge variant="amber" icon={Landmark}>
            Official Extension Guide
          </Badge>
        }
      />

      {/* Mandatory Official Guidance Notice */}
      <div
        role="note"
        aria-label="Government Schemes Disclaimer"
        className="p-4 rounded-card bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3 text-xs sm:text-sm"
      >
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900">
            Important Information Regarding Schemes & DBT
          </p>
          <p className="text-amber-800 leading-relaxed">
            All listed benefits, subsidy percentages, and deadlines are illustrative and drawn from general government documentation. Always verify current registration windows and official portal guidelines directly on MahaDBT, PM-KISAN, and central ministry portals.
          </p>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Schemes tabs"
      />

      {activeTab === 'browse' ? (
        <div className="space-y-6">
          {/* Search & Filter Bar */}
          <Card className="p-4 sm:p-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search schemes by name (e.g. PM-KISAN, Solar Pump, MahaDBT, Insurance)..."
                aria-label="Search government schemes"
                className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-pill border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
              />
            </div>

            {/* Level and Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Jurisdiction
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {SCHEME_LEVELS.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedLevel(lvl)}
                      className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-pill transition-colors ${
                        selectedLevel === lvl
                          ? 'bg-primary text-white shadow-xs font-semibold'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Support Type
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {SCHEME_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`min-h-[36px] px-3 py-1.5 text-xs font-medium rounded-pill transition-colors ${
                        selectedCategory === cat
                          ? 'bg-primary text-white shadow-xs font-semibold'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Schemes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme) => (
              <Card
                key={scheme.id}
                className="flex flex-col justify-between border-gray-200 hover:border-primary/40 transition-colors space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Badge variant={scheme.level.includes('Maharashtra') ? 'amber' : 'primary'} size="sm">
                      {scheme.level}
                    </Badge>
                    <Badge variant="info" size="sm">
                      {scheme.category}
                    </Badge>
                    <span className="text-[11px] font-medium text-gray-500 ml-auto">
                      {scheme.deadlineStatus}
                    </span>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-gray-900 leading-snug">
                    {scheme.name}
                  </h3>

                  {/* Benefit Highlight Box */}
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 font-medium">
                    <span className="font-semibold block text-emerald-950 mb-0.5">Key Benefit:</span>
                    {scheme.shortBenefit}
                  </div>

                  {/* Eligibility */}
                  <div className="text-xs sm:text-sm text-gray-700 space-y-1">
                    <span className="font-semibold text-gray-900 block">Eligibility:</span>
                    <p className="text-gray-600 leading-relaxed">{scheme.eligibility}</p>
                  </div>

                  {/* Required Documents */}
                  <div className="text-xs text-gray-700 space-y-1">
                    <span className="font-semibold text-gray-900 block">Required Verification:</span>
                    <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                      {scheme.documentsRequired.map((doc, i) => (
                        <li key={i}>{doc}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[11px] text-gray-400 italic">
                    {scheme.statusNote}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <a
                    href={scheme.officialPortal}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-primary transition-colors min-h-[44px] px-1"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  <PillButton
                    variant="primary"
                    size="sm"
                    icon={CheckCircle2}
                    onClick={() => setApplyingScheme(scheme)}
                  >
                    Apply Now (Demo)
                  </PillButton>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* MY APPLICATIONS TAB */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-gray-900">
              Active Scheme Applications ({applications.length})
            </h3>
            <span className="text-xs text-gray-500">Click refresh to advance verification status</span>
          </div>

          {applications.length === 0 ? (
            <EmptyState
              icon={Landmark}
              title="No scheme applications submitted yet"
              description="Apply for central and state agriculture subsidies to track verification progress in real-time."
              actionText="Browse Available Schemes"
              onAction={() => setActiveTab('browse')}
            />
          ) : (
            <div className="space-y-4">
              {applications.map((app) => {
                const isApproved = app.status === 'Approved';
                const isUnderReview = app.status === 'Under Review';
                const isSubmitted = app.status === 'Submitted';

                return (
                  <Card key={app.id} className="p-5 space-y-4 border-gray-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                            {app.id}
                          </span>
                          <Badge
                            variant={isApproved ? 'success' : isUnderReview ? 'warning' : 'info'}
                            size="sm"
                          >
                            Status: {app.status}
                          </Badge>
                        </div>
                        <h4 className="text-base sm:text-lg font-heading font-bold text-gray-900">
                          {app.schemeName}
                        </h4>
                      </div>

                      <PillButton
                        variant="outline"
                        size="sm"
                        icon={RotateCcw}
                        onClick={() => refreshSchemeStatus(app.id)}
                        disabled={isApproved}
                        ariaLabel={`Refresh verification status for ${app.id}`}
                      >
                        {isApproved ? 'Approved (Final)' : 'Refresh Status'}
                      </PillButton>
                    </div>

                    {/* Stepper Display */}
                    <div className="py-2">
                      <div className="flex items-center justify-between max-w-lg mx-auto relative">
                        <div className="absolute top-4 left-6 right-6 h-0.5 bg-gray-200 -z-0" />

                        {['Submitted', 'Under Review', 'Approved'].map((stepName, idx) => {
                          const isDone =
                            app.status === stepName ||
                            (stepName === 'Submitted' && (isUnderReview || isApproved)) ||
                            (stepName === 'Under Review' && isApproved);

                          const isCurrent = app.status === stepName;

                          return (
                            <div key={stepName} className="flex flex-col items-center z-10 space-y-1">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                  isDone
                                    ? 'bg-primary text-white shadow-xs'
                                    : 'bg-gray-100 text-gray-400 border border-gray-300'
                                }`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span
                                className={`text-[11px] font-medium text-center ${
                                  isCurrent ? 'text-primary font-bold' : 'text-gray-500'
                                }`}
                              >
                                {stepName}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-xl text-xs text-gray-600">
                      <div>
                        <span className="text-gray-400 block">Applicant</span>
                        <span className="font-medium text-gray-900">{app.applicantName}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Aadhaar (Last 4)</span>
                        <span className="font-mono font-medium text-gray-900">**** **** {app.aadhaarLast4}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Land Size</span>
                        <span className="font-medium text-gray-900">{app.landSize}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Bank Account</span>
                        <span className="font-medium text-gray-900 truncate block">{app.bankAccountMasked}</span>
                      </div>
                    </div>

                    {/* History notes */}
                    {app.statusHistory && app.statusHistory.length > 0 && (
                      <div className="text-xs space-y-1 pt-1">
                        <span className="font-semibold text-gray-700 block">Tracking Log:</span>
                        {app.statusHistory.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" aria-hidden="true" />
                            <span className="font-medium text-gray-900">{h.status}:</span>
                            <span>{h.note}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 3-Step Application Modal */}
      <SchemeApplicationModal
        scheme={applyingScheme}
        isOpen={Boolean(applyingScheme)}
        onClose={() => setApplyingScheme(null)}
        onSubmit={handleApplySubmit}
        defaultName={currentUser.name}
        defaultLandSize={currentUser.farmSize}
      />
    </div>
  );
}
