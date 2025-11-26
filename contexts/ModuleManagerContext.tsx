'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Module, Download, Section, Notification, NotificationType, VersionInfo, ModuleManagerContextType } from '@/types';
import { initialModules } from '@/data/modules';
import { SERVER_VERSION } from '@/constants/version';
import { useVersion } from '@/hooks/useVersion';

const ModuleManagerContext = createContext<ModuleManagerContextType | undefined>(undefined);

export const ModuleManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentVersion, updateVersion } = useVersion();
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [activeDownloads, setActiveDownloads] = useState<Download[]>([]);
  const [downloadHistory, setDownloadHistory] = useState<Download[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    current: currentVersion,
    latest: SERVER_VERSION,
    updateAvailable: false,
    updateSize: '45.2 MB',
    changelog: '• Performance improvements\n• New module categories\n• Bug fixes and stability enhancements'
  });
  const [isForceUpdating, setIsForceUpdating] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // Counter untuk unique IDs
  const notificationCounter = useRef(0);

  // Update version info when currentVersion changes
  useEffect(() => {
    setVersionInfo(prev => ({
      ...prev,
      current: currentVersion,
      updateAvailable: SERVER_VERSION !== currentVersion
    }));
  }, [currentVersion]);

  // Auto-remove notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(1));
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notifications]);

  const showNotification = (message: string, type: NotificationType = 'info') => {
    notificationCounter.current += 1;
    const newNotification: Notification = {
      id: `${Date.now()}-${notificationCounter.current}`,
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const checkForUpdates = async (): Promise<VersionInfo> => {
    // Simulate API call to check for updates
    return new Promise((resolve) => {
      setTimeout(() => {
        const updateAvailable = SERVER_VERSION !== currentVersion;
        const info: VersionInfo = {
          current: currentVersion,
          latest: SERVER_VERSION,
          updateAvailable,
          updateSize: '45.2 MB',
          changelog: '• Performance improvements\n• New module categories\n• Bug fixes and stability enhancements'
        };
        setVersionInfo(info);
        resolve(info);
      }, 1500);
    });
  };

  // Manual check for updates - untuk public access
  const manualCheckForUpdates = async (): Promise<void> => {
    setLoadingText('Checking for updates...');
    const updateInfo = await checkForUpdates();

    if (updateInfo.updateAvailable) {
      setShowUpdateDialog(true);
    } else {
      showNotification('You are using the latest version!', 'success');
    }
  };

  const downloadUpdate = () => {
    showNotification('Downloading application update...', 'info');
    setIsForceUpdating(true);
    setShowUpdateDialog(false);

    // Simulate update download
    const updateDownloadId = Date.now();
    const updateDownload: Download = {
      id: updateDownloadId,
      moduleId: -1, // Special ID for app update
      moduleName: 'Application Update',
      progress: 0,
      status: 'downloading',
      startTime: new Date()
    };

    setActiveDownloads(prev => [...prev, updateDownload]);
    simulateUpdateDownload(updateDownloadId);
  };

  const simulateUpdateDownload = (downloadId: number) => {
    const interval = setInterval(() => {
      setActiveDownloads(prev => prev.map(download => {
        if (download.id === downloadId) {
          const progress = Math.min(download.progress + Math.random() * 20, 100);

          if (progress >= 100) {
            clearInterval(interval);

            const completedDownload = {
              ...download,
              progress: 100,
              status: 'completed' as const,
              endTime: new Date()
            };

            // Move to history
            setDownloadHistory(prev => [...prev, completedDownload]);

            // Remove from active downloads
            setActiveDownloads(prev => prev.filter(d => d.id !== downloadId));

            // Update version in localStorage
            updateVersion(SERVER_VERSION);

            showNotification('Application updated successfully! Restart the app to apply changes.', 'success');
            setIsForceUpdating(false);

            return completedDownload;
          }

          return { ...download, progress };
        }
        return download;
      }));
    }, 300);
  };

  const autoForceUpdate = () => {
    setLoadingText('Update required. Downloading latest version...');
    downloadUpdate();
  };

  const showLoadingScreen = async () => {
    const loadingSteps = [
      { text: 'Initializing core systems...', progress: 15 },
      { text: 'Loading module database...', progress: 30 },
      { text: 'Checking for updates...', progress: 50 },
      { text: 'Verifying installation...', progress: 70 },
      { text: 'Preparing user interface...', progress: 85 },
      { text: 'Ready!', progress: 100 }
    ];

    let currentStep = 0;

    const updateLoading = async () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        setLoadingProgress(step.progress);
        currentStep++;

        // Check for updates at step 2 (tanpa force update)
        if (currentStep === 3) {
          await checkForUpdates();
          // Hanya check, tidak melakukan force update otomatis
        }

        if (currentStep < loadingSteps.length) {
          setTimeout(updateLoading, 800);
        } else {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }
    };

    updateLoading();
  };

  const showSection = (section: Section) => {
    setCurrentSection(section);
  };

  const downloadModule = (moduleId: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const downloadId = Date.now();
    const download: Download = {
      id: downloadId,
      moduleId: moduleId,
      moduleName: module.name,
      progress: 0,
      status: 'downloading',
      startTime: new Date()
    };

    setActiveDownloads(prev => [...prev, download]);
    simulateDownload(downloadId);
    showSection('downloads');
    showNotification(`Downloading ${module.name}...`, 'info');
  };

  const simulateDownload = (downloadId: number) => {
    const interval = setInterval(() => {
      setActiveDownloads(prev => prev.map(download => {
        if (download.id === downloadId) {
          const progress = Math.min(download.progress + Math.random() * 15, 100);

          if (progress >= 100) {
            clearInterval(interval);

            const completedDownload = {
              ...download,
              progress: 100,
              status: 'completed' as const,
              endTime: new Date()
            };

            // Move to history
            setDownloadHistory(prev => [...prev, completedDownload]);

            // Update module status
            setModules(prev => prev.map(module =>
              module.id === completedDownload.moduleId
                ? { ...module, installed: true }
                : module
            ));

            // Remove from active downloads
            setActiveDownloads(prev => prev.filter(d => d.id !== downloadId));

            showNotification(`${download.moduleName} downloaded successfully!`, 'success');

            return completedDownload;
          }

          return { ...download, progress };
        }
        return download;
      }));
    }, 500);
  };

  const uninstallModule = (moduleId: number) => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    setModules(prev => prev.map(m =>
      m.id === moduleId ? { ...m, installed: false } : m
    ));

    showNotification(`${module.name} uninstalled successfully!`, 'success');
  };

  useEffect(() => {
    showLoadingScreen();
  }, []);

  const value: ModuleManagerContextType = {
    modules,
    activeDownloads: activeDownloads.filter(d => d.status === 'downloading'),
    downloadHistory,
    notifications,
    currentSection,
    isLoading: isLoading && !isForceUpdating,
    loadingProgress,
    loadingText,
    versionInfo,
    showSection,
    downloadModule,
    uninstallModule,
    removeNotification,
    checkForUpdates,
    downloadUpdate,
    isForceUpdating,
    showUpdateDialog,
    setShowUpdateDialog,
    manualCheckForUpdates
  };

  return (
    <ModuleManagerContext.Provider value={value}>
      {children}
    </ModuleManagerContext.Provider>
  );
};

export const useModuleManager = () => {
  const context = useContext(ModuleManagerContext);
  if (context === undefined) {
    throw new Error('useModuleManager must be used within a ModuleManagerProvider');
  }
  return context;
};