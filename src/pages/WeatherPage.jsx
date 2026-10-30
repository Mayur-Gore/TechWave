import { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  Sunset,
  Sunrise,
  ShieldAlert,
  AlertTriangle,
  Info,
  MapPin,
  Compass,
  Lightbulb,
  CloudRain,
  CloudLightning,
  Sparkles,
  Bell
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PillButton from '../components/ui/PillButton';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { CITIES, seedWeatherData } from '../data/seedWeather';

export default function WeatherPage() {
  const { triggerWeatherAlert, addToast, t } = useApp();
  const [selectedCity, setSelectedCity] = useState('Pune');
  const [locationNotice, setLocationNotice] = useState('');

  const currentData = seedWeatherData[selectedCity] || seedWeatherData.Pune;

  const handleSimulateLocation = () => {
    setSelectedCity('Pune');
    setLocationNotice('Simulated location detected: Baramati, Pune Agri-District (No GPS prompt needed).');
    setTimeout(() => setLocationNotice(''), 4000);
  };

  const handleAlertNotify = (alert) => {
    triggerWeatherAlert(alert);
    addToast({
      type: 'info',
      title: 'Alert Subscribed',
      message: `Weather alert added to your notifications feed: ${alert.title}`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.nav.weather}
        subtitle="Localized farm weather forecasts, precipitation probability, and micro-climate crop advisories for Maharashtra."
        badge={
          <Badge variant="amber" icon={CloudSun}>
            Simulated demo data
          </Badge>
        }
        action={
          <PillButton
            variant="outline"
            icon={Compass}
            size="sm"
            onClick={handleSimulateLocation}
          >
            Use My Location (Simulated)
          </PillButton>
        }
      />

      {locationNotice && (
        <div
          role="status"
          className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-card text-xs sm:text-sm font-medium flex items-center gap-2 animate-in fade-in"
        >
          <MapPin className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
          <span>{locationNotice}</span>
        </div>
      )}

      {/* City Selector Pills */}
      <Card className="p-3 sm:p-4">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
          Select Agri Zone / जिल्हा निवडा
        </label>
        <div className="flex items-center gap-2 flex-wrap">
          {CITIES.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`min-h-[42px] px-4 py-2 text-sm font-medium rounded-pill transition-colors ${
                selectedCity === city
                  ? 'bg-primary text-white shadow-xs font-semibold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Weather Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <Card className="lg:col-span-8 bg-gradient-to-br from-emerald-800 via-primary to-emerald-900 text-white border-0 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-200 font-semibold block">
                  Current Farm Atmosphere
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white flex items-center gap-2 mt-0.5">
                  <MapPin className="w-5 h-5 text-amber" aria-hidden="true" />
                  <span>{currentData.city}</span>
                </h2>
              </div>
              <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-pill font-medium w-fit">
                Illustrative Demo Rates
              </span>
            </div>

            {/* Current temperature and main condition */}
            <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center text-amber shrink-0 shadow-inner">
                  <CloudSun className="w-12 h-12" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                    {currentData.temp}°C
                  </div>
                  <p className="text-base text-emerald-100 font-medium mt-1">
                    {currentData.condition}
                  </p>
                  <p className="text-xs text-emerald-200">
                    Feels like {currentData.feelsLike}°C
                  </p>
                </div>
              </div>

              {/* Weather parameters grid */}
              <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm text-emerald-100 bg-white/10 p-3.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sky-300" aria-hidden="true" />
                  <span>Humidity: {currentData.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                  <span>Wind: {currentData.wind}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-sky-200" aria-hidden="true" />
                  <span>Rain Chance: {currentData.rainChance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber" aria-hidden="true" />
                  <span>UV: {currentData.uvIndex}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sunrise / Sunset bar */}
          <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs text-emerald-200">
            <span className="flex items-center gap-1.5">
              <Sunrise className="w-4 h-4 text-amber" aria-hidden="true" />
              <span>Sunrise: {currentData.sunrise}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Sunset className="w-4 h-4 text-orange-300" aria-hidden="true" />
              <span>Sunset: {currentData.sunset}</span>
            </span>
          </div>
        </Card>

        {/* Farming Tip of the Day */}
        <Card className="lg:col-span-4 border-emerald-200 bg-emerald-50/60 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary font-heading font-semibold text-sm">
              <Lightbulb className="w-5 h-5 text-amber" aria-hidden="true" />
              <span>Agronomic Tip of the Day</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed font-normal">
              "{currentData.tipOfTheDay}"
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs text-gray-500">
            <span>Validated for {selectedCity} crops</span>
            <span className="font-semibold text-primary">KVK Verified</span>
          </div>
        </Card>
      </div>

      {/* 5-Day Extended Weather Forecast */}
      <section aria-labelledby="forecast-heading" className="space-y-3">
        <h3 id="forecast-heading" className="text-lg font-heading font-bold text-gray-900">
          5-Day Agricultural Forecast / पुढील ५ दिवसांचा अंदाज
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {currentData.forecast.map((f, i) => (
            <Card key={i} className="text-center p-4 hover:border-primary/40 transition-colors">
              <span className="text-sm font-heading font-semibold text-gray-900 block mb-2">
                {f.day}
              </span>
              <div className="w-12 h-12 rounded-full bg-gray-50 mx-auto flex items-center justify-center mb-2">
                {f.rain > 50 ? (
                  <CloudLightning className="w-6 h-6 text-sky-600" aria-hidden="true" />
                ) : f.rain > 20 ? (
                  <CloudRain className="w-6 h-6 text-sky-500" aria-hidden="true" />
                ) : (
                  <Sun className="w-6 h-6 text-amber" aria-hidden="true" />
                )}
              </div>
              <div className="font-heading font-bold text-gray-900 text-base">
                {f.tempHigh}° / <span className="text-gray-500 font-normal">{f.tempLow}°</span>
              </div>
              <p className="text-xs text-gray-600 mt-1 truncate">{f.condition}</p>
              <div className="mt-2 text-[11px] font-medium text-sky-700 bg-sky-50 py-0.5 px-2 rounded-full inline-block">
                {f.rain}% precipitation
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Weather & Pest Alerts Section */}
      <section aria-labelledby="alerts-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 id="alerts-heading" className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-danger" aria-hidden="true" />
            <span>Active Micro-Climate Alerts for {selectedCity}</span>
          </h3>
          <span className="text-xs text-gray-500">Updated hourly (Demo)</span>
        </div>

        <div className="space-y-3">
          {currentData.alerts.map((alert) => {
            const isHigh = alert.severity === 'high';
            const isMed = alert.severity === 'medium';

            const severityStyles = isHigh
              ? 'bg-red-50 border-danger text-red-950'
              : isMed
              ? 'bg-amber-50 border-amber text-amber-950'
              : 'bg-blue-50 border-blue-300 text-blue-950';

            const badgeVariant = isHigh ? 'danger' : isMed ? 'warning' : 'info';
            const Icon = isHigh ? AlertTriangle : isMed ? ShieldAlert : Info;

            return (
              <div
                key={alert.id}
                role="alert"
                className={`p-4 sm:p-5 rounded-card border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${severityStyles}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-full bg-white/80 shrink-0 mt-0.5">
                    <Icon className="w-5 h-5 text-gray-900" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-heading font-bold text-base text-gray-950">
                        {alert.title}
                      </h4>
                      <Badge variant={badgeVariant} size="sm">
                        {alert.severity.toUpperCase()} SEVERITY
                      </Badge>
                      <span className="text-xs text-gray-600 font-medium">
                        {alert.issuedAt}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-800 leading-relaxed max-w-3xl">
                      {alert.message}
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <PillButton
                    variant="white"
                    size="sm"
                    icon={Bell}
                    onClick={() => handleAlertNotify(alert)}
                    ariaLabel={`Notify me about ${alert.title}`}
                  >
                    Receive Alert
                  </PillButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
