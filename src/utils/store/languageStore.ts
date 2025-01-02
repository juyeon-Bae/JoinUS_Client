import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LanguageType = 'ko' | 'en';

interface LanguageState {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
}

export const getInitialLanguage = (): LanguageType => {
  const stored = localStorage.getItem('language-storage');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed.state.language || 'ko';
    } catch {
      return 'ko';
    }
  }
  return 'ko';
};

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: getInitialLanguage(),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);