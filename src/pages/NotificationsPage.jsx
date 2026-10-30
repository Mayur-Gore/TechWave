import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  CloudSun,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Landmark,
  ArrowRight,
  Clock
} from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import PillButton from '../components/ui/PillButton';
import Tabs from '../components/ui/Tabs';
import EmptyState from '../components/ui/EmptyState';
import { useApp } from '../context/AppContext';
import { NOTIFICATION_TABS } from '../data/seedNotifications';

export default function NotificationsPage() {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    t,
  } = useApp();

  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const tabsConfig = NOTIFICATION_TABS.map((tab) => ({
    id: tab,
    label: tab,
    count:
      tab === 'All'
        ? notifications.length
        : notifications.filter((n) => n.category === tab).length,
  }));

  const filteredNotifications = useMemo(() => {
    if (activeTab === 'All') return notifications;
    return notifications.filter((n) => n.category === activeTab);
  }, [notifications, activeTab]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length;
  }, [notifications]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Weather':
        return { icon: CloudSun, bg: 'bg-blue-100 text-blue-800' };
      case 'Prices':
        return { icon: TrendingUp, bg: 'bg-amber-100 text-amber-800' };
      case 'Orders':
        return { icon: ShoppingBag, bg: 'bg-emerald-100 text-emerald-800' };
      case 'AI Tips':
        return { icon: Sparkles, bg: 'bg-purple-100 text-purple-800' };
      case 'Schemes':
        return { icon: Landmark, bg: 'bg-rose-100 text-rose-800' };
      default:
        return { icon: Bell, bg: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleNotificationClick = (item) => {
    if (item.unread) {
      markNotificationRead(item.id);
    }
    if (item.link) {
      navigate(item.link);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={t.common.notifications}
        subtitle="Real-time agricultural advisories, mandi rate jumps, weather alerts, and scheme progress tracking."
        action={
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <PillButton
                variant="outline"
                size="sm"
                icon={CheckCheck}
                onClick={markAllNotificationsRead}
              >
                Mark All as Read ({unreadCount})
              </PillButton>
            )}
          </div>
        }
      />

      {/* Category Tabs */}
      <Tabs
        tabs={tabsConfig}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Notification category tabs"
      />

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications in this category"
          description="You are all caught up! New weather alerts, price updates, and orders will appear here automatically."
          actionText={activeTab !== 'All' ? 'View All Notifications' : undefined}
          onAction={activeTab !== 'All' ? () => setActiveTab('All') : undefined}
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((notif) => {
            const { icon: CategoryIcon, bg: iconBg } = getCategoryIcon(notif.category);

            return (
              <Card
                key={notif.id}
                hoverable
                className={`flex items-start justify-between gap-4 p-4 sm:p-5 transition-all border ${
                  notif.unread
                    ? 'border-primary/40 bg-emerald-50/20 shadow-xs'
                    : 'border-gray-200/80 bg-white'
                }`}
              >
                {/* Clickable Area to Mark Read & Navigate */}
                <div
                  onClick={() => handleNotificationClick(notif)}
                  className="flex items-start gap-3.5 flex-1 cursor-pointer"
                >
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${iconBg}`}>
                    <CategoryIcon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-semibold text-sm sm:text-base text-gray-900 leading-snug">
                        {notif.title}
                      </h3>
                      {notif.unread && (
                        <span className="w-2 h-2 rounded-full bg-primary" aria-label="Unread notification" />
                      )}
                      <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {notif.category}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>{notif.timestamp}</span>
                      </span>
                      {notif.link && (
                        <span className="text-primary font-semibold hover:underline flex items-center gap-0.5">
                          <span>View Details</span>
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => deleteNotification(notif.id)}
                  aria-label={`Delete notification: ${notif.title}`}
                  className="p-2 text-gray-400 hover:text-danger hover:bg-gray-100 rounded-full transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 -mt-2"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
