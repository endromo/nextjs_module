'use client';

import { useState } from 'react';
import { Module } from '@/types';

interface ModuleCardProps {
  module: Module;
  onDownload: (id: number) => void;
  onUninstall: (id: number) => void;
}

export const ModuleCard = ({ module, onDownload, onUninstall }: ModuleCardProps) => {
  const [showUninstallConfirm, setShowUninstallConfirm] = useState(false);

  const handleUninstall = () => {
    onUninstall(module.id);
    setShowUninstallConfirm(false);
  };

  return (
    <div className="module-card rounded-xl p-6 card-hover">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">{module.name}</h3>
        {module.installed ? (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Installed</span>
        ) : (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Available</span>
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-4">{module.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Category:</span>
          <span>{module.category}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Size:</span>
          <span>{module.size}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Version:</span>
          <span>{module.version}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Rating:</span>
          <span>⭐ {module.rating}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Downloads:</span>
          <span>{module.downloads.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-blue-400">{module.price}</span>
      </div>
      
      {module.installed ? (
        <div className="space-y-2">
          {showUninstallConfirm ? (
            <div className="space-y-2">
              <p className="text-sm text-yellow-400 text-center">
                Are you sure you want to uninstall?
              </p>
              <div className="flex space-x-2">
                <button 
                  onClick={handleUninstall}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex-1"
                >
                  Yes, Uninstall
                </button>
                <button 
                  onClick={() => setShowUninstallConfirm(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowUninstallConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
            >
              Uninstall
            </button>
          )}
        </div>
      ) : (
        <button 
          onClick={() => onDownload(module.id)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors w-full"
        >
          Download
        </button>
      )}
    </div>
  );
};