'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';
import { Notification } from './Notification';

export const NotificationContainer = () => {
  const { notifications } = useModuleManager();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <Notification key={notification.id} notification={notification} />
      ))}
    </div>
  );
};