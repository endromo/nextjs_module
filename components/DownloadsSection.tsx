'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';

export const DownloadsSection = () => {
  const { activeDownloads, downloadHistory } = useModuleManager();

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gradient mb-8">Download Manager</h2>
        
        <div className="module-card rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Active Downloads</h3>
          <div className="space-y-4">
            {activeDownloads.length === 0 ? (
              <p className="text-gray-400">No active downloads</p>
            ) : (
              activeDownloads.map(download => (
                <div key={download.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">
                      {download.moduleId === -1 ? '🎯 ' : ''}{download.moduleName}
                      {download.moduleId === -1 && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">App Update</span>}
                    </h4>
                    <span className="text-sm text-blue-400">{download.progress.toFixed(1)}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="progress-bar h-full rounded-full" 
                      style={{ width: `${download.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="module-card rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Download History</h3>
          <div className="space-y-3">
            {downloadHistory.length === 0 ? (
              <p className="text-gray-400">No download history</p>
            ) : (
              downloadHistory.slice(-5).reverse().map(download => (
                <div key={download.id} className="flex justify-between items-center bg-gray-800 rounded-lg p-3">
                  <div>
                    <h4 className="font-medium">
                      {download.moduleId === -1 ? '🎯 ' : ''}{download.moduleName}
                      {download.moduleId === -1 && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">App Update</span>}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {download.endTime?.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-green-400 text-sm">Completed</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};