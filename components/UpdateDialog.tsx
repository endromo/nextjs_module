'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';

export const UpdateDialog = () => {
  const { 
    versionInfo, 
    showUpdateDialog, 
    setShowUpdateDialog, 
    downloadUpdate 
  } = useModuleManager();

  if (!showUpdateDialog) return null;

  const handleUpdateNow = () => {
    // Hard reload halaman loading
    window.location.reload();
  };

  const handleUpdateLater = () => {
    setShowUpdateDialog(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4 border border-gray-700">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gradient mb-2">Update Available!</h2>
          <p className="text-gray-300">A new version of Module Manager is available</p>
        </div>

        {/* Version Info */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Current Version:</span>
            <span className="text-blue-400 font-mono">{versionInfo.current}</span>
          </div>
          <div className="flex justify-between items-center text-sm mb-3">
            <span className="text-gray-400">Latest Version:</span>
            <span className="text-green-400 font-mono">{versionInfo.latest}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Update Size:</span>
            <span className="text-yellow-400">{versionInfo.updateSize}</span>
          </div>
        </div>

        {/* Changelog */}
        <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-30 rounded-lg p-4 mb-6">
          <h3 className="text-yellow-400 text-sm font-medium mb-2">What's New:</h3>
          <div className="text-yellow-200 text-xs text-left whitespace-pre-line">
            {versionInfo.changelog}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleUpdateLater}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg transition-colors font-medium"
          >
            Update Later
          </button>
          <button
            onClick={handleUpdateNow}
            className="flex-1 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Download Update Now
          </button>
        </div>

        <p className="text-gray-400 text-xs text-center mt-4">
          The app will restart to apply the update
        </p>
      </div>
    </div>
  );
};