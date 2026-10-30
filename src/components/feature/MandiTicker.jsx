import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp } from 'lucide-react';

export default function MandiTicker({ mandiPrices, t }) {
  // Select 8 popular commodities to display in ticker
  const tickerItems = mandiPrices.slice(0, 10);

  return (
    <section
      aria-label="Mandi Rates Ticker"
      className="bg-emerald-900 text-white py-2.5 px-4 overflow-hidden border-y border-emerald-800"
    >
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Ticker Badge / Label */}
        <div className="shrink-0 flex items-center gap-1.5 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-700/50 text-xs font-semibold text-amber">
          <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">{t.home.mandiTickerLabel}</span>
          <span className="sm:hidden">Mandi</span>
        </div>

        {/* Marquee ticker container with pause-on-hover */}
        <div className="relative overflow-hidden w-full group">
          <div className="flex items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:overflow-x-auto motion-reduce:py-1">
            {tickerItems.map((item) => (
              <Link
                key={item.id}
                to="/mandi-prices"
                className="inline-flex items-center gap-2 text-xs sm:text-sm hover:text-amber transition-colors focus-visible:outline-white rounded"
              >
                <span className="font-medium text-emerald-100">{item.commodity}</span>
                <span className="font-bold text-white">₹{item.modal.toLocaleString('en-IN')}</span>
                <span
                  className={`inline-flex items-center font-semibold text-xs px-1.5 py-0.5 rounded ${
                    item.direction === 'up'
                      ? 'bg-green-500/20 text-green-300'
                      : item.direction === 'down'
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-gray-500/20 text-gray-300'
                  }`}
                >
                  {item.direction === 'up' && (
                    <>
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                      <span>▲ +{item.changePct}%</span>
                    </>
                  )}
                  {item.direction === 'down' && (
                    <>
                      <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
                      <span>▼ {item.changePct}%</span>
                    </>
                  )}
                  {item.direction === 'neutral' && (
                    <>
                      <Minus className="w-3 h-3" aria-hidden="true" />
                      <span>0%</span>
                    </>
                  )}
                </span>
                <span className="text-[10px] text-emerald-400">({item.mandi.split(' ')[0]})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
