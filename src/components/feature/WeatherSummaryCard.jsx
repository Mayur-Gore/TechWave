import { Link } from 'react-router-dom';
import { CloudSun, Droplets, Wind, ChevronRight, Sun, CloudRain } from 'lucide-react';
import Card from '../ui/Card';

export default function WeatherSummaryCard({ weather, t }) {
  if (!weather) return null;

  const nextDays = weather.forecast?.slice(1, 4) || [];

  return (
    <Card className="bg-gradient-to-br from-emerald-800 to-primary text-white border-0 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/15">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold block mb-0.5">
            {t.home.weatherSummaryTitle}
          </span>
          <h2 className="text-lg font-heading font-bold text-white flex items-center gap-2">
            <span>{weather.city}</span>
            <span className="text-[11px] bg-white/20 text-white px-2 py-0.5 rounded-full font-normal">
              Live Demo
            </span>
          </h2>
        </div>

        <Link
          to="/weather"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-amber hover:text-white transition-colors"
        >
          <span>5-Day Advisory</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Main Temp & Condition */}
      <div className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-amber shrink-0">
            <CloudSun className="w-10 h-10" aria-hidden="true" />
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              {weather.temp}°C
            </div>
            <p className="text-sm text-emerald-100 font-medium">
              {weather.condition} • Feels like {weather.feelsLike}°C
            </p>
          </div>
        </div>

        <div className="text-right space-y-1 text-xs sm:text-sm text-emerald-100">
          <div className="flex items-center justify-end gap-1.5">
            <Droplets className="w-4 h-4 text-sky-300" aria-hidden="true" />
            <span>Rain: {weather.rainChance}</span>
          </div>
          <div className="flex items-center justify-end gap-1.5">
            <Wind className="w-4 h-4 text-emerald-300" aria-hidden="true" />
            <span>{weather.wind}</span>
          </div>
        </div>
      </div>

      {/* Next 3 Days forecast strip */}
      <div className="pt-3 border-t border-white/15 grid grid-cols-3 gap-2">
        {nextDays.map((f, i) => (
          <div key={i} className="bg-white/10 rounded-xl p-2.5 text-center">
            <span className="text-xs font-medium text-emerald-200 block mb-1">
              {f.day}
            </span>
            <div className="flex items-center justify-center mb-1">
              {f.rain > 30 ? (
                <CloudRain className="w-5 h-5 text-sky-200" aria-hidden="true" />
              ) : (
                <Sun className="w-5 h-5 text-amber" aria-hidden="true" />
              )}
            </div>
            <span className="text-xs sm:text-sm font-bold text-white block">
              {f.tempHigh}° / {f.tempLow}°
            </span>
            <span className="text-[10px] text-emerald-200 block mt-0.5">
              {f.rain}% rain
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
