export interface Module {
  id: number;
  name: string;
  description: string;
  category: string;
  size: string;
  version: string;
  rating: number;
  downloads: number;
  installed: boolean;
  price: string;
}

export interface Notification {
  id: string; // Ubah dari number ke string
  message: string;
  type: NotificationType;
  timestamp: Date;
}

export interface Download {
  id: number; // Tetap number untuk downloads
  moduleId: number;
  moduleName: string;
  progress: number;
  status: 'downloading' | 'completed';
  startTime: Date;
  endTime?: Date;
}

export interface VersionInfo {
  current: string;
  latest: string;
  updateAvailable: boolean;
  updateSize?: string;
  changelog?: string;
}

export type Section = 'home' | 'modules' | 'downloads' | 'settings';
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface ModuleManagerContextType {
  modules: Module[];
  activeDownloads: Download[];
  downloadHistory: Download[];
  notifications: Notification[];
  currentSection: Section;
  isLoading: boolean;
  loadingProgress: number;
  loadingText: string;
  versionInfo: VersionInfo;
  showSection: (section: Section) => void;
  downloadModule: (moduleId: number) => void;
  uninstallModule: (moduleId: number) => void;
  removeNotification: (id: string) => void;
  checkForUpdates: () => Promise<void>;
  downloadUpdate: () => void;
  isForceUpdating?: boolean;
  showUpdateDialog: boolean; // Tambahkan ini
  setShowUpdateDialog: (show: boolean) => void; // Tambahkan ini
  manualCheckForUpdates: () => Promise<void>; // Tambahkan ini
}