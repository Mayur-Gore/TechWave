import { useState } from 'react';
import {
  User,
  MapPin,
  Sprout,
  CreditCard,
  Bell,
  Globe,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  Home
} from 'lucide-react';

import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import FormField from '../components/ui/FormField';
import PillButton from '../components/ui/PillButton';
import Badge from '../components/ui/Badge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import AddressModal from '../components/feature/AddressModal';
import PaymentMethodModal from '../components/feature/PaymentMethodModal';
import { useApp } from '../context/AppContext';
import { CROPS_LIST } from '../data/seedCropProblems';

export default function ProfilePage() {
  const {
    currentUser,
    updateProfile,
    addAddress,
    deleteAddress,
    addPaymentMethod,
    deletePaymentMethod,
    language,
    changeLanguage,
    resetDemoData,
    t,
  } = useApp();

  // Profile form state
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    phone: currentUser.phone || '',
    email: currentUser.email || '',
    village: currentUser.village || '',
    taluka: currentUser.taluka || '',
    district: currentUser.district || '',
    state: currentUser.state || 'Maharashtra',
    farmSize: currentUser.farmSize || '4.5 Acres',
    soilType: currentUser.soilType || 'Black Clayey Loam (Regur)',
    irrigationType: currentUser.irrigationType || 'Drip & Borewell',
    cropsGrown: currentUser.cropsGrown || ['Cotton', 'Soybean', 'Tomato'],
    notificationPrefs: currentUser.notificationPrefs || {
      weatherAlerts: true,
      priceAlerts: true,
      orderUpdates: true,
      schemeUpdates: true,
    },
  });

  const [errors, setErrors] = useState({});
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Farmer name is required.';
    }

    // 10-digit Indian mobile number validation starting with 6-9
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.';
    }

    if (!formData.village.trim()) {
      errs.village = 'Village name is required.';
    }

    if (!formData.district.trim()) {
      errs.district = 'District is required.';
    }

    if (!formData.farmSize.trim()) {
      errs.farmSize = 'Farm acreage is required.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    updateProfile({
      ...currentUser,
      ...formData,
      initials: formData.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
    });
  };

  const toggleCrop = (crop) => {
    setFormData((prev) => {
      const exists = prev.cropsGrown.includes(crop);
      const updated = exists
        ? prev.cropsGrown.filter((c) => c !== crop)
        : [...prev.cropsGrown, crop];
      return { ...prev, cropsGrown: updated };
    });
  };

  const togglePref = (key) => {
    setFormData((prev) => ({
      ...prev,
      notificationPrefs: {
        ...prev.notificationPrefs,
        [key]: !prev.notificationPrefs[key],
      },
    }));
  };

  const initials = currentUser.initials || 'RP';

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHeader
        title={t.nav.profile}
        subtitle="Manage your farmer identity, land parcels, notification alerts, and delivery destinations."
        badge={
          <Badge variant="primary" icon={User}>
            Farmer ID: {currentUser.id}
          </Badge>
        }
      />

      {/* Main Profile Info Card & Form */}
      <Card className="p-6 space-y-6">
        {/* Avatar and Welcome Hero */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-gray-100 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-800 text-white font-heading font-bold text-2xl flex items-center justify-center shadow-card shrink-0">
            {initials}
          </div>
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-gray-900">
              {currentUser.name}
            </h2>
            <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              <span>{currentUser.village}, {currentUser.district}, {currentUser.state}</span>
            </p>
            <p className="text-xs text-primary font-medium">
              Registered Farmholder • {currentUser.farmSize}
            </p>
          </div>
        </div>

        {/* Edit Profile Form */}
        <form onSubmit={handleProfileSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="profile-name"
              label="Full Farmer Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />

            <FormField
              id="profile-phone"
              label="10-Digit Mobile Number (India)"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              hint="Must be a 10-digit number starting with 6, 7, 8, or 9."
              placeholder="9823012345"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              id="profile-village"
              label="Village"
              required
              value={formData.village}
              onChange={(e) => setFormData({ ...formData, village: e.target.value })}
              error={errors.village}
            />
            <FormField
              id="profile-district"
              label="District"
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              error={errors.district}
            />
            <FormField
              id="profile-state"
              label="State"
              value={formData.state}
              disabled
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="profile-farm-size"
              label="Cultivable Farm Size"
              required
              value={formData.farmSize}
              onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
              error={errors.farmSize}
              placeholder="e.g. 4.5 Acres"
            />

            <FormField
              id="profile-soil-type"
              label="Predominant Soil Type"
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              placeholder="e.g. Black Clayey Loam (Regur)"
            />
          </div>

          {/* Crops Grown Selection */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700">
              Crops Grown on Your Land (Select to customize advisory)
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {CROPS_LIST.map((crop) => {
                const isSelected = formData.cropsGrown.includes(crop);
                return (
                  <button
                    key={crop}
                    type="button"
                    onClick={() => toggleCrop(crop)}
                    className={`min-h-[38px] px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-pill transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-primary text-white shadow-xs font-semibold'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Sprout className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{crop}</span>
                    {isSelected && <span aria-hidden="true">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 flex justify-end">
            <PillButton type="submit" variant="primary" icon={Save}>
              Save Profile Changes
            </PillButton>
          </div>
        </form>
      </Card>

      {/* 2. Saved Addresses CRUD Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" aria-hidden="true" />
              <span>Saved Farm Delivery Addresses</span>
            </h3>
            <p className="text-xs text-gray-500">Destination points for seeds and equipment delivery.</p>
          </div>

          <PillButton
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddressModalOpen(true)}
          >
            Add Address
          </PillButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentUser.savedAddresses?.map((addr) => (
            <div
              key={addr.id}
              className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-sm text-gray-900">
                    {addr.label}
                  </span>
                  {addr.isDefault && (
                    <span className="text-[10px] bg-primary-light text-primary-dark font-bold px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  {addr.addressLine}, {addr.village}, {addr.district} - {addr.pincode}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Recipient: {addr.recipientName || currentUser.name} ({addr.phone || currentUser.phone})</p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => deleteAddress(addr.id)}
                  disabled={currentUser.savedAddresses.length <= 1}
                  className="text-xs text-danger hover:underline disabled:opacity-40 flex items-center gap-1 min-h-[36px]"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Delete Address</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Demo Payment Methods CRUD Card */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-heading font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" aria-hidden="true" />
              <span>Masked Demo Payment Instruments</span>
            </h3>
            <p className="text-xs text-gray-500">Sandbox instruments for placing demo agricultural orders.</p>
          </div>

          <PillButton
            variant="outline"
            size="sm"
            icon={Plus}
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Add Method
          </PillButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentUser.demoPaymentMethods?.map((pm) => (
            <div
              key={pm.id}
              className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">
                  {pm.type}
                </span>
                <h4 className="font-heading font-semibold text-sm text-gray-900 mt-0.5">
                  {pm.label}
                </h4>
                <p className="text-xs font-mono text-gray-600 mt-0.5">
                  {pm.value}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => deletePaymentMethod(pm.id)}
                  disabled={currentUser.demoPaymentMethods.length <= 1}
                  className="text-xs text-danger hover:underline disabled:opacity-40 flex items-center gap-1 min-h-[36px]"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Language & Notification Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Selection */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-heading font-bold text-gray-900 text-base">
              Language Settings / भाषा निवडा
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            Choose your preferred agricultural interface language. Note: Hindi and Marathi strings are community draft translations.
          </p>
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { code: 'en', label: 'English' },
              { code: 'mr', label: 'मराठी' },
              { code: 'hi', label: 'हिन्दी' },
            ].map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => changeLanguage(l.code)}
                className={`min-h-[44px] py-2 px-3 text-sm font-semibold rounded-xl border transition-colors ${
                  language === l.code
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Notification Alerts Toggles */}
        <Card className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" aria-hidden="true" />
            <h3 className="font-heading font-bold text-gray-900 text-base">
              Advisory Alerts
            </h3>
          </div>
          <div className="space-y-2 pt-1 text-xs">
            {[
              { key: 'weatherAlerts', label: 'Severe Weather & Pest Humidity Alerts' },
              { key: 'priceAlerts', label: 'Mandi Price 5% Fluctuations' },
              { key: 'orderUpdates', label: 'Purchase & Dispatch Tracking' },
              { key: 'schemeUpdates', label: 'Govt Scheme Verification Advances' },
            ].map((p) => (
              <label key={p.key} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                <span className="text-gray-700 font-medium">{p.label}</span>
                <input
                  type="checkbox"
                  checked={Boolean(formData.notificationPrefs?.[p.key])}
                  onChange={() => togglePref(p.key)}
                  className="rounded text-primary focus:ring-primary h-4 w-4"
                />
              </label>
            ))}
          </div>
        </Card>
      </div>

      {/* 5. Central Reset Demo Data Action */}
      <Card className="p-5 border-red-100 bg-red-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading font-bold text-danger text-base">
            Reset Demo Data Sandbox
          </h3>
          <p className="text-xs text-gray-600 mt-0.5 max-w-lg leading-relaxed">
            Clears local modifications, returns all 10 screens to original seeded farmers, crops, orders, and listings.
          </p>
        </div>

        <PillButton
          variant="danger"
          size="sm"
          icon={RotateCcw}
          onClick={() => setIsResetDialogOpen(true)}
          className="shrink-0"
        >
          {t.common.resetData}
        </PillButton>
      </Card>

      {/* Address Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddAddress={addAddress}
      />

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onAddPaymentMethod={addPaymentMethod}
      />

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetDialogOpen}
        onClose={() => setIsResetDialogOpen(false)}
        onConfirm={() => {
          resetDemoData();
          setIsResetDialogOpen(false);
        }}
        title="Reset All Demo Data?"
        message="This action will clear your local changes and reload the verified starter state for Ramesh Patil and the 10 screens."
        confirmText="Confirm Reset"
        cancelText="Cancel"
      />
    </div>
  );
}
