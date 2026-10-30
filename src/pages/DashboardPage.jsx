import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  ShoppingBag,
  FileCheck2,
  Bell,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Store,
  Landmark,
  TrendingUp,
  Activity,
  Edit2,
  Trash2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PillButton from '../components/ui/PillButton';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import IncomeExpenseSvgChart from '../components/feature/IncomeExpenseSvgChart';
import CropFormModal from '../components/feature/CropFormModal';
import { useApp } from '../context/AppContext';

export default function DashboardPage() {
  const {
    currentUser,
    crops,
    orders,
    applications,
    notifications,
    activity,
    createCrop,
    updateCrop,
    deleteCrop,
  } = useApp();


  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [deleteCropId, setDeleteCropId] = useState(null);

  // Derived metrics from real records
  const activeCropsCount = crops.length;
  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Placed' || o.status === 'Packed').length;
  }, [orders]);

  const openApplicationsCount = useMemo(() => {
    return applications.filter((a) => a.status === 'Submitted' || a.status === 'Under Review').length;
  }, [applications]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length;
  }, [notifications]);

  const firstName = currentUser.name.split(' ')[0] || 'Farmer';

  const handleOpenAddCrop = () => {
    setEditingCrop(null);
    setIsCropModalOpen(true);
  };

  const handleOpenEditCrop = (crop) => {
    setEditingCrop(crop);
    setIsCropModalOpen(true);
  };

  const handleCropSubmit = (cropData) => {
    if (editingCrop) {
      updateCrop(cropData);
    } else {
      createCrop(cropData);
    }
  };

  const handleConfirmDeleteCrop = () => {
    if (deleteCropId) {
      deleteCrop(deleteCropId);
      setDeleteCropId(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Personalized Farmer Greeting */}
      <PageHeader
        title={`Welcome back, ${firstName}!`}
        subtitle={`${currentUser.village}, ${currentUser.district} • Land: ${currentUser.farmSize} • Soil: ${currentUser.soilType || 'Black Clayey Loam'}`}
        action={
          <div className="flex items-center gap-2">
            <Link to="/ai-advisor">
              <PillButton variant="primary" icon={Sparkles} size="sm">
                Ask AI Advisor
              </PillButton>
            </Link>
            <PillButton
              variant="outline"
              icon={Plus}
              size="sm"
              onClick={handleOpenAddCrop}
            >
              Add Crop
            </PillButton>
          </div>
        }
      />

      {/* 1. Derived Key Metrics Widgets (Real Records) */}
      <section aria-labelledby="metrics-heading" className="space-y-3">
        <h2 id="metrics-heading" className="sr-only">
          Farm Metrics Overview
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Crops Widget */}
          <Card className="p-4 sm:p-5 flex items-center gap-3.5 border-emerald-100 bg-white">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Sprout className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium block">Active Crops</span>
              <span className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900">
                {activeCropsCount}
              </span>
              <span className="text-[11px] text-emerald-700 block font-medium">In Field</span>
            </div>
          </Card>

          {/* Pending Orders Widget */}
          <Link to="/marketplace" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card">
            <Card hoverable className="p-4 sm:p-5 flex items-center gap-3.5 border-amber-100 bg-white h-full">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShoppingBag className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">Pending Orders</span>
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900">
                  {pendingOrdersCount}
                </span>
                <span className="text-[11px] text-amber-700 block font-medium">Placed / Packed</span>
              </div>
            </Card>
          </Link>

          {/* Open Scheme Applications Widget */}
          <Link to="/schemes" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card">
            <Card hoverable className="p-4 sm:p-5 flex items-center gap-3.5 border-blue-100 bg-white h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">Open Schemes</span>
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900">
                  {openApplicationsCount}
                </span>
                <span className="text-[11px] text-blue-700 block font-medium">Under Scrutiny</span>
              </div>
            </Card>
          </Link>

          {/* Unread Notifications Widget */}
          <Link to="/notifications" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-card">
            <Card hoverable className="p-4 sm:p-5 flex items-center gap-3.5 border-purple-100 bg-white h-full">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                <Bell className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs text-gray-500 font-medium block">Notifications</span>
                <span className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900">
                  {unreadNotificationsCount}
                </span>
                <span className="text-[11px] text-purple-700 block font-medium">Unread Alerts</span>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* 2. My Crops Manager (CRUD with health indicators and progress bars) */}
      <section aria-labelledby="crops-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="crops-heading" className="text-xl font-heading font-bold text-gray-900">
              My Crops & Health Monitor / पीक संवर्धन
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Track growth stages, biological vigor and field observations.
            </p>
          </div>

          <PillButton
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={handleOpenAddCrop}
          >
            Add Crop
          </PillButton>
        </div>

        {crops.length === 0 ? (
          <EmptyState
            icon={Sprout}
            title="No crops registered yet"
            description="Add your first farm crop to monitor growth stages, moisture status and AI pest protection."
            actionText="Register Crop"
            onAction={handleOpenAddCrop}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {crops.map((crop) => {
              const isHealthy = crop.health === 'Healthy';
              const isNeedsAttention = crop.health === 'Needs Attention';

              const badgeVariant = isHealthy ? 'success' : isNeedsAttention ? 'warning' : 'danger';
              const Icon = isHealthy ? CheckCircle2 : isNeedsAttention ? AlertTriangle : ShieldAlert;
              const barColor = isHealthy ? 'bg-success' : isNeedsAttention ? 'bg-amber' : 'bg-danger';

              return (
                <Card
                  key={crop.id}
                  className="flex flex-col justify-between border-gray-200/90 shadow-card p-5 space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-heading font-bold text-gray-900 text-lg">
                          {crop.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {crop.area} • Sown: {crop.sowingDate}
                        </p>
                      </div>

                      <Badge variant={badgeVariant} size="sm" icon={Icon}>
                        {crop.health}
                      </Badge>
                    </div>

                    {/* Stage & Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{crop.stage || 'Vegetative Stage'}</span>
                        <span className="font-bold text-gray-900">{crop.healthScore || 85}% Vigor</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${crop.healthScore || 85}%` }}
                          aria-label={`Crop health vigor ${crop.healthScore || 85}%`}
                        />
                      </div>
                    </div>

                    {crop.notes && (
                      <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 leading-relaxed">
                        &ldquo;{crop.notes}&rdquo;
                      </p>
                    )}
                  </div>


                  {/* Actions: Edit / Remove */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCrop(crop)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-primary transition-colors min-h-[36px] px-1"
                    >
                      <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Edit Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteCropId(crop.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-danger hover:underline transition-colors min-h-[36px] px-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. Hand-Built SVG Financial Income vs Expenses Chart */}
      <section aria-labelledby="financial-chart-heading">
        <h2 id="financial-chart-heading" className="sr-only">
          Income and Expense Chart
        </h2>
        <IncomeExpenseSvgChart />
      </section>

      {/* 4. Recent Activity Log & Quick Action Links Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Recent Activity Log */}
        <Card className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" aria-hidden="true" />
              <h3 className="font-heading font-bold text-gray-900 text-base">
                Recent Farmer Activity Log
              </h3>
            </div>
            <span className="text-xs text-gray-500">Live deterministic audit</span>
          </div>

          {activity.length === 0 ? (
            <p className="text-xs text-gray-500 italic py-4 text-center">
              No recent activity recorded yet.
            </p>
          ) : (
            <div className="space-y-3">
              {activity.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-heading font-semibold text-xs sm:text-sm text-gray-900 truncate">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 shrink-0">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Shortcut Actions Card */}
        <Card className="lg:col-span-4 space-y-3 bg-gray-50/70 border-gray-200">
          <h3 className="font-heading font-bold text-gray-900 text-base pb-2 border-b border-gray-200">
            Quick Farmer Actions
          </h3>

          <div className="space-y-2">
            <Link
              to="/ai-advisor"
              className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-primary-light/40 transition-colors border border-gray-200 text-sm font-medium text-gray-900"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Diagnose Crop Symptoms</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </Link>

            <Link
              to="/marketplace"
              className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-primary-light/40 transition-colors border border-gray-200 text-sm font-medium text-gray-900"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>List Produce / Buy Inputs</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </Link>

            <Link
              to="/schemes"
              className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-primary-light/40 transition-colors border border-gray-200 text-sm font-medium text-gray-900"
            >
              <div className="flex items-center gap-2.5">
                <Landmark className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Track Govt Subsidies</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </Link>

            <Link
              to="/mandi-prices"
              className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-primary-light/40 transition-colors border border-gray-200 text-sm font-medium text-gray-900"
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>Check APMC Mandi Rates</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Crop Form Modal */}
      <CropFormModal
        isOpen={isCropModalOpen}
        onClose={() => {
          setIsCropModalOpen(false);
          setEditingCrop(null);
        }}
        onSubmit={handleCropSubmit}
        initialCrop={editingCrop}
      />

      {/* Delete Crop Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deleteCropId)}
        onClose={() => setDeleteCropId(null)}
        onConfirm={handleConfirmDeleteCrop}
        title="Remove Crop from Farm Monitor?"
        message="Are you sure you want to remove this crop record from your active field monitoring?"
        confirmText="Yes, Remove Crop"
        cancelText="Cancel"
      />
    </div>
  );
}
