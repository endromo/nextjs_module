'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';

export const LoadingScreen = () => {
  const { loadingProgress, loadingText, versionInfo, isForceUpdating } = useModuleManager();

  // Jika sedang force update, tampilkan UI yang berbeda
  if (isForceUpdating) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center hero-bg" suppressHydrationWarning>
        <div className="text-center">
          <div className="floating-element mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="loading-spinner w-24 h-24 border-4 border-green-500 border-t-transparent rounded-full pulse-glow"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">↑</span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gradient mb-4">Updating App</h1>
          <p className="text-gray-300 text-lg mb-8">{loadingText}</p>
          
          <div className="w-64 mx-auto mb-6">
            <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-teal-600 transition-all duration-300" 
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{loadingProgress.toFixed(0)}% Complete</p>
          </div>

          {/* Version Info selama update */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 max-w-md mx-auto">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-400">Updating from:</span>
              <span className="text-yellow-400 font-mono">{versionInfo.current}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">To version:</span>
              <span className="text-green-400 font-mono">{versionInfo.latest}</span>
            </div>
            
            <div className="mt-3 p-3 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-30 rounded-lg">
              <p className="text-green-300 text-sm">
                Please wait while we download and install the latest version...
              </p>
            </div>
          </div>
          
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  // UI loading normal (tanpa update available section)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center hero-bg" suppressHydrationWarning>
      <div className="text-center">
        <div className="floating-element mb-8">
          <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="loading-spinner w-24 h-24 border-4 border-blue-500 border-t-transparent rounded-full pulse-glow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ML</span>
              </div>
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-gradient mb-4">Module Manager</h1>
        <p className="text-gray-300 text-lg mb-8">{loadingText}</p>
        
        <div className="w-64 mx-auto mb-6">
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="progress-bar h-full rounded-full" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">{loadingText}</p>
        </div>

        {/* Version Info sederhana tanpa update available */}
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700 max-w-md mx-auto">
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-gray-400">Current Version:</span>
            <span className="text-blue-400 font-mono">{versionInfo.current}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Latest Version:</span>
            <span className="text-green-400 font-mono">{versionInfo.latest}</span>
          </div>
        </div>
        
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};