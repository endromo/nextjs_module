'use client';

import { useModuleManager } from '@/contexts/ModuleManagerContext';
import { Section } from '@/types';

export const Navigation = () => {
  const { currentSection, showSection } = useModuleManager();

  const navItems: { key: Section; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'modules', label: 'Modules' },
    { key: 'downloads', label: 'Downloads' },
    { key: 'settings', label: 'Settings' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 nav-blur border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">ML</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">Module Manager</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => showSection(item.key)}
                className={`${
                  currentSection === item.key 
                    ? 'text-blue-400' 
                    : 'text-gray-300 hover:text-white'
                } font-medium transition-colors`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};