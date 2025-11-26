'use client';

import { useState, useEffect } from 'react';

// Key untuk localStorage
const VERSION_STORAGE_KEY = 'module-manager-version';

export const useVersion = () => {
  const [currentVersion, setCurrentVersion] = useState<string>('2.0.1'); // Default fallback

  // Get version from localStorage on component mount
  useEffect(() => {
    const savedVersion = localStorage.getItem(VERSION_STORAGE_KEY);
    if (savedVersion) {
      setCurrentVersion(savedVersion);
    } else {
      // Set initial version jika belum ada
      localStorage.setItem(VERSION_STORAGE_KEY, '2.0.1');
      setCurrentVersion('2.0.1');
    }
  }, []);

  // Update version in localStorage
  const updateVersion = (newVersion: string) => {
    localStorage.setItem(VERSION_STORAGE_KEY, newVersion);
    setCurrentVersion(newVersion);
  };

  return {
    currentVersion,
    updateVersion
  };
};