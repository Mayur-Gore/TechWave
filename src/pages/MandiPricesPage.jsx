import { useState, useMemo } from 'react';
import {
  TrendingUp,
  Search,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import { useApp } from '../context/AppContext';
import {
  MANDIS,
  MANDI_CATEGORIES,
  seedMandiPrices
} from '../data/seedMandiPrices';

export default function MandiPricesPage() {
  const { watchlist, toggleWatchlist, triggerPriceAlert, addToast, t } = useApp();

  const [activeCategory, setActiveCategory] = useState('Vegetables');
  const [selectedMandi, setSelectedMandi] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('commodity'); // 'commodity', 'min', 'max', 'modal', 'changePct'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const tabsConfig = MANDI_CATEGORIES.map((cat) => ({
    id: cat,
    label: cat,
    count: seedMandiPrices.filter((p) => p.category === cat).length,
  }));

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleToggleStar = (item) => {
    toggleWatchlist(item.id);
    const willBeWatchlisted = !watchlist.includes(item.id);

    if (willBeWatchlisted) {
      addToast({
        type: 'success',
        title: 'Added to Watchlist',
        message: `${item.commodity} will now be tracked on your Farmer Dashboard.`,
      });

      // Price alert check: if absolute change >= 5%, trigger notification
      if (Math.abs(item.changePct) >= 5) {
        triggerPriceAlert(item);
      }
    } else {
      addToast({
        type: 'info',
        title: 'Removed from Watchlist',
        message: `${item.commodity} removed from dashboard tracking.`,
      });
    }
  };

  // Filtered and sorted data
  const filteredPrices = useMemo(() => {
    return seedMandiPrices.filter((item) => {
      // Category filter
      if (!showWatchlistOnly && item.category !== activeCategory) {
        return false;
      }

      // Watchlist filter
      if (showWatchlistOnly && !watchlist.includes(item.id)) {
        return false;
      }

      // Mandi filter
      if (selectedMandi !== 'All' && !item.mandi.includes(selectedMandi.split(' ')[0])) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const commMatch = item.commodity.toLowerCase().includes(q);
        const varietyMatch = item.variety.toLowerCase().includes(q);
        const mandiMatch = item.mandi.toLowerCase().includes(q);
        if (!commMatch && !varietyMatch && !mandiMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [activeCategory, selectedMandi, searchQuery, sortField, sortOrder, showWatchlistOnly, watchlist]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.nav.mandiPrices}
        subtitle="Daily modal wholesale rates, arrival volumes, and price fluctuations across major APMC markets in Maharashtra."
        badge={
          <Badge variant="amber" icon={TrendingUp}>
            Illustrative demo rates
          </Badge>
        }
        action={
          <button
            type="button"
            onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
            className={`min-h-[44px] px-4 py-2 rounded-pill text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-colors ${
              showWatchlistOnly
                ? 'bg-amber text-gray-900 border-amber-hover shadow-xs'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Star
              className={`w-4 h-4 ${showWatchlistOnly ? 'fill-gray-900 text-gray-900' : 'text-gray-400'}`}
              aria-hidden="true"
            />
            <span>Watchlist ({watchlist.length})</span>
          </button>
        }
      />

      {/* Mandatory Illustrative Notice */}
      <div
        role="note"
        aria-label="Demo Mandi Notice"
        className="p-3 bg-amber-50 text-amber-950 border border-amber-300 rounded-card text-xs flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
          <span>
            <strong>Demo Rates:</strong> Illustrative demo rates, not live mandi prices. Always check actual auction chits at your local APMC yard before loading produce.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-gray-600 font-medium shrink-0 ml-4">
          <Calendar className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
          <span>Market Date: 14 Oct 2026</span>
        </div>
      </div>

      {/* Category Tabs */}
      {!showWatchlistOnly && (
        <Tabs
          tabs={tabsConfig}
          activeTab={activeCategory}
          onChange={setActiveCategory}
          ariaLabel="Commodity category tabs"
        />
      )}

      {/* Filter and Mandi Controls */}
      <Card className="p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commodity (e.g. Onion, Soybean, Turmeric, Tomato)..."
              aria-label="Search mandi commodity rates"
              className="w-full min-h-[44px] pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-pill border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Mandi Selector */}
          <div className="w-full sm:w-auto shrink-0 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500 hidden sm:inline" aria-hidden="true" />
            <select
              value={selectedMandi}
              onChange={(e) => setSelectedMandi(e.target.value)}
              aria-label="Select mandi yard"
              className="w-full sm:w-auto min-h-[44px] px-3.5 py-2 text-xs sm:text-sm font-medium bg-gray-50 border border-gray-200 rounded-pill text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white"
            >
              <option value="All">All Maharashtra Mandis</option>
              {MANDIS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <span>
            Showing <strong>{filteredPrices.length}</strong> commodities
            {showWatchlistOnly && ' in Watchlist'}
          </span>
          <span className="sm:hidden font-medium">14 Oct 2026</span>
        </div>
      </Card>

      {/* Main Rates: Desktop Table and Mobile Stacked Cards */}
      {filteredPrices.length === 0 ? (
        <EmptyState
          icon={TrendingUp}
          title={showWatchlistOnly ? 'No crops in your watchlist' : 'No commodities found'}
          description={
            showWatchlistOnly
              ? 'Star any commodity from the table to track daily rate fluctuations here and on your dashboard.'
              : 'Try clearing your search query or selecting another APMC market.'
          }
          actionText={showWatchlistOnly ? 'Browse All Rates' : 'Reset Search'}
          onAction={
            showWatchlistOnly
              ? () => setShowWatchlistOnly(false)
              : () => {
                  setSearchQuery('');
                  setSelectedMandi('All');
                }
          }
        />
      ) : (
        <>
          {/* 1. Desktop Table (Hidden on Mobile) */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-card shadow-card border border-gray-200/80">
            <table className="w-full text-left border-collapse" aria-label="Mandi rates table">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <th scope="col" className="py-3.5 pl-4 pr-2 w-12 text-center">
                    <span className="sr-only">Watchlist Star</span>
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('commodity')}
                    className="py-3.5 px-4 cursor-pointer hover:text-primary transition-colors select-none"
                  >
                    Commodity & Variety {sortField === 'commodity' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="py-3.5 px-4">
                    APMC Mandi Yard
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('min')}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-primary transition-colors select-none"
                  >
                    Min (₹) {sortField === 'min' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('max')}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-primary transition-colors select-none"
                  >
                    Max (₹) {sortField === 'max' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('modal')}
                    className="py-3.5 px-4 text-right cursor-pointer hover:text-primary transition-colors select-none"
                  >
                    Modal Rate (₹/Qtl) {sortField === 'modal' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                  <th
                    scope="col"
                    onClick={() => handleSort('changePct')}
                    className="py-3.5 pl-4 pr-6 text-right cursor-pointer hover:text-primary transition-colors select-none"
                  >
                    Daily Trend {sortField === 'changePct' && (sortOrder === 'asc' ? '▲' : '▼')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredPrices.map((item) => {
                  const isStarred = watchlist.includes(item.id);

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-primary-light/20 transition-colors"
                    >
                      <td className="py-3 pl-4 pr-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStar(item)}
                          aria-label={isStarred ? `Remove ${item.commodity} from watchlist` : `Add ${item.commodity} to watchlist`}
                          className="p-1 text-gray-400 hover:text-amber transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center mx-auto"
                        >
                          <Star
                            className={`w-4 h-4 ${isStarred ? 'fill-amber text-amber' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        <div className="font-semibold">{item.commodity}</div>
                        <div className="text-xs text-gray-500">{item.variety}</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-600">
                        {item.mandi}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-gray-600">
                        ₹{item.min.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-gray-600">
                        ₹{item.max.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-heading font-bold text-primary text-base">
                        ₹{item.modal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 pl-4 pr-6 text-right">
                        <span
                          className={`inline-flex items-center gap-1 font-semibold text-xs px-2 py-0.5 rounded-full ${
                            item.direction === 'up'
                              ? 'bg-green-100 text-green-800'
                              : item.direction === 'down'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {item.direction === 'up' && (
                            <>
                              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>▲ +{item.changePct}%</span>
                            </>
                          )}
                          {item.direction === 'down' && (
                            <>
                              <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>▼ {item.changePct}%</span>
                            </>
                          )}
                          {item.direction === 'neutral' && (
                            <>
                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>0%</span>
                            </>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile Stacked Cards (<768px) */}
          <div className="md:hidden space-y-3">
            {filteredPrices.map((item) => {
              const isStarred = watchlist.includes(item.id);

              return (
                <Card key={item.id} className="p-4 space-y-3 border-gray-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-bold text-gray-900 text-base">
                        {item.commodity}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {item.variety} • {item.mandi.split(' ')[0]}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStar(item)}
                      aria-label={isStarred ? `Remove ${item.commodity} from watchlist` : `Add ${item.commodity} to watchlist`}
                      className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-gray-400 hover:text-amber"
                    >
                      <Star
                        className={`w-5 h-5 ${isStarred ? 'fill-amber text-amber' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <div>
                      <span className="text-xs text-gray-500 block">Modal Rate:</span>
                      <span className="text-xl font-heading font-extrabold text-primary">
                        ₹{item.modal.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-normal text-gray-500">/Qtl</span>
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-full ${
                        item.direction === 'up'
                          ? 'bg-green-100 text-green-800'
                          : item.direction === 'down'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.direction === 'up' && (
                        <>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>▲ +{item.changePct}%</span>
                        </>
                      )}
                      {item.direction === 'down' && (
                        <>
                          <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>▼ {item.changePct}%</span>
                        </>
                      )}
                      {item.direction === 'neutral' && (
                        <>
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>0%</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <div>
                      <span className="text-gray-400 block">Min Rate:</span>
                      <span className="font-mono font-medium">₹{item.min.toLocaleString('en-IN')}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Max Rate:</span>
                      <span className="font-mono font-medium">₹{item.max.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
