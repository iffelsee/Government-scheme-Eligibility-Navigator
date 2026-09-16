
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SavedSchemesContextType {
  savedSlugs: string[];
  toggleSave: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  savedCount: number;
}

const SavedSchemesContext = createContext<SavedSchemesContextType | undefined>(undefined);

export const SavedSchemesProvider = ({ children }: { children: ReactNode }) => {
  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('scheme_navigator_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('scheme_navigator_saved', JSON.stringify(savedSlugs));
    } catch (e) {
      console.error(e);
    }
  }, [savedSlugs]);

  const toggleSave = (slug: string) => {
    setSavedSlugs(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const isSaved = (slug: string) => savedSlugs.includes(slug);

  return (
    <SavedSchemesContext.Provider
      value={{
        savedSlugs,
        toggleSave,
        isSaved,
        savedCount: savedSlugs.length,
      }}
    >
      {children}
    </SavedSchemesContext.Provider>
  );
};

export const useSavedSchemes = () => {
  const context = useContext(SavedSchemesContext);
  if (!context) throw new Error('useSavedSchemes must be used within SavedSchemesProvider');
  return context;
};
