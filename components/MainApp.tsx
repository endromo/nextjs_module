'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';
import { LoadingScreen } from './LoadingScreen';
import { Navigation } from './Navigation';
import { HomeSection } from './HomeSection';
import { ModulesSection } from './ModulesSection';
import { DownloadsSection } from './DownloadsSection';
import { SettingsSection } from './SettingsSection';
import { NotificationContainer } from './NotificationContainer';
import { UpdateDialog } from './UpdateDialog';

export const MainApp = () => {
  const { isLoading, currentSection } = useModuleManager();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen text-white" suppressHydrationWarning>
      <Navigation />
      <NotificationContainer />
      <UpdateDialog />
      
      {currentSection === 'home' && <HomeSection />}
      {currentSection === 'modules' && <ModulesSection />}
      {currentSection === 'downloads' && <DownloadsSection />}
      {currentSection === 'settings' && <SettingsSection />}
    </div>
  );
};