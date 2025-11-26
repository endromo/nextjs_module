'use client';

import { useState } from 'react';
import { useModuleManager } from '@/contexts/ModuleManagerContext';

export const SettingsSection = () => {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [maxConcurrentDownloads, setMaxConcurrentDownloads] = useState('3');
  const [downloadLocation, setDownloadLocation] = useState('/storage/modules');
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState('id');
  const [autoCleanDownloads, setAutoCleanDownloads] = useState(true);
  const { manualCheckForUpdates, versionInfo } = useModuleManager();

  const handleChangeDownloadLocation = () => {
    // Simulate folder selection
    const newLocation = prompt('Enter download location:', downloadLocation);
    if (newLocation) {
      setDownloadLocation(newLocation);
    }
  };

  const handleClearCache = () => {
    // Simulate cache clearing
    if (confirm('Are you sure you want to clear all cache? This action cannot be undone.')) {
      alert('Cache cleared successfully!');
    }
  };

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gradient mb-8">Settings</h2>
        
        {/* Application Updates Settings */}
        <div className="module-card rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-6">Application Updates</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Current Version</h4>
                <p className="text-gray-400 text-sm">Installed application version</p>
              </div>
              <span className="text-blue-400 font-mono">{versionInfo.current}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Latest Version</h4>
                <p className="text-gray-400 text-sm">Latest available version</p>
              </div>
              <span className="text-green-400 font-mono">{versionInfo.latest}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Update Status</h4>
                <p className="text-gray-400 text-sm">Current update availability</p>
              </div>
              <span className={`font-medium ${
                versionInfo.updateAvailable ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {versionInfo.updateAvailable ? 'Update Available' : 'Up to Date'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Check for updates</h4>
                <p className="text-gray-400 text-sm">Manually check for application updates</p>
              </div>
              <button 
                onClick={manualCheckForUpdates}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Check Now
              </button>
            </div>
          </div>
        </div>

        {/* Download Settings */}
        <div className="module-card rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-6">Download Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Auto-update modules</h4>
                <p className="text-gray-400 text-sm">Otomatis perbarui modul yang terinstall</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoUpdate}
                  onChange={(e) => setAutoUpdate(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Download location</h4>
                <p className="text-gray-400 text-sm">Lokasi penyimpanan modul</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 text-sm max-w-xs truncate">{downloadLocation}</span>
                <button 
                  onClick={handleChangeDownloadLocation}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                >
                  Change Location
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Max concurrent downloads</h4>
                <p className="text-gray-400 text-sm">Jumlah download bersamaan</p>
              </div>
              <select 
                value={maxConcurrentDownloads}
                onChange={(e) => setMaxConcurrentDownloads(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="module-card rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-6">Appearance Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Dark mode</h4>
                <p className="text-gray-400 text-sm">Gunakan tema gelap</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Language</h4>
                <p className="text-gray-400 text-sm">Bahasa aplikasi</p>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
              </select>
            </div>
          </div>
        </div>

        {/* Storage Settings */}
        <div className="module-card rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-6">Storage Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Cache size</h4>
                <p className="text-gray-400 text-sm">Total ukuran cache: 256 MB</p>
              </div>
              <button 
                onClick={handleClearCache}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Clear Cache
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Auto-clean downloads</h4>
                <p className="text-gray-400 text-sm">Hapus file download setelah 30 hari</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={autoCleanDownloads}
                  onChange={(e) => setAutoCleanDownloads(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Download history</h4>
                <p className="text-gray-400 text-sm">Simpan riwayat download selama</p>
              </div>
              <select className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white">
                <option>30 days</option>
                <option>90 days</option>
                <option>1 year</option>
                <option>Forever</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="module-card rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-6">Notification Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Download notifications</h4>
                <p className="text-gray-400 text-sm">Tampilkan notifikasi saat download selesai</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  defaultChecked 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Update notifications</h4>
                <p className="text-gray-400 text-sm">Beri tahu ketika update tersedia</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  defaultChecked 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Sound effects</h4>
                <p className="text-gray-400 text-sm">Putar suara untuk notifikasi</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  defaultChecked 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="module-card rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-6">Advanced Settings</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Developer mode</h4>
                <p className="text-gray-400 text-sm">Akses fitur developer</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Debug logging</h4>
                <p className="text-gray-400 text-sm">Aktifkan log untuk debugging</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium">Reset all settings</h4>
                <p className="text-gray-400 text-sm">Kembalikan semua pengaturan ke default</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};