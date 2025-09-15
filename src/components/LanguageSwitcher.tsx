import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  const getLanguageLabel = () => {
    switch (language) {
      case 'en':
        return { next: 'ES', label: 'Switch to Spanish', title: 'Cambiar a español' };
      case 'es':
        return { next: 'TH', label: 'Switch to Thai', title: 'เปลี่ยนเป็นภาษาไทย' };
      case 'th':
        return { next: 'EN', label: 'Switch to English', title: 'Switch to English' };
      default:
        return { next: 'EN', label: 'Switch to English', title: 'Switch to English' };
    }
  };

  const { next, label, title } = getLanguageLabel();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-6 right-6 z-50 bg-gray-800 hover:bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border-2 border-pink-500"
      aria-label={label}
      title={title}
    >
      {next}
    </button>
  );
};

export default LanguageSwitcher;
