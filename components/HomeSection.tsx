'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';

export const HomeSection = () => {
  const { modules, showSection } = useModuleManager();

  const installedModules = modules.filter(m => m.installed).length;
  const totalSize = modules
    .filter(m => m.installed)
    .reduce((total, module) => {
      const sizeValue = parseFloat(module.size.replace('GB', '').replace('MB', ''));
      const isGB = module.size.includes('GB');
      return total + (isGB ? sizeValue * 1024 : sizeValue);
    }, 0);

  const formattedSize = totalSize >= 1024 ? `${(totalSize / 1024).toFixed(1)}GB` : `${totalSize.toFixed(1)}MB`;

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gradient mb-4">Welcome to Module Manager</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Kelola dan download modul tambahan untuk game Anda dengan mudah. Tingkatkan pengalaman bermain dengan modul eksklusif dan fitur premium.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Total Modules Card */}
          <div className="module-card rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold text-blue-400">{modules.length}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Total Modules</h3>
            <p className="text-gray-400 text-sm">{modules.length} modul tersedia</p>
          </div>

          {/* Installed Modules Card */}
          <div className="module-card rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold text-purple-400">{installedModules}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Installed</h3>
            <p className="text-gray-400 text-sm">{installedModules} modul terinstall</p>
          </div>

          {/* Storage Used Card */}
          <div className="module-card rounded-xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <span className="text-2xl font-bold text-green-400">
                {formattedSize}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Storage Used</h3>
            <p className="text-gray-400 text-sm">Total ukuran modul</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="module-card rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <button 
              onClick={() => showSection('modules')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold">Browse Modules</h4>
                  <p className="text-sm opacity-90">Jelajahi {modules.length} modul baru yang tersedia</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};