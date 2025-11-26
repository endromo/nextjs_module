'use client';

import { useState } from 'react';
import { useModuleManager } from '@/contexts/ModuleManagerContext';
import { ModuleCard } from './ModuleCard';

export const ModulesSection = () => {
  const { modules, downloadModule, uninstallModule } = useModuleManager();
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All Categories', 'Graphics', 'Audio', 'Gameplay', 'Tools'];

  const filteredModules = modules.filter(module => {
    const matchesCategory = selectedCategory === 'All Categories' || module.category === selectedCategory;
    const matchesSearch = module.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         module.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gradient">Available Modules</h2>
          <div className="flex space-x-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input 
              type="text" 
              placeholder="Search modules..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white w-64"
            />
          </div>
        </div>

        <div className="mb-4 text-gray-400">
          Showing {filteredModules.length} of {modules.length} modules
          {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map(module => (
            <ModuleCard
              key={module.id}
              module={module}
              onDownload={downloadModule}
              onUninstall={uninstallModule}
            />
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No modules found</div>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};