import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const Header = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(true);
  const user = localStorage.getItem('contenthub-user')
    ? JSON.parse(localStorage.getItem('contenthub-user'))
    : null;

  // For mobile sidebar toggle
  const handleSidebarToggle = () => {
    const event = new CustomEvent('toggleSidebar');
    window.dispatchEvent(event);
  };

  return (
    <header className="flex items-center justify-between flex-wrap p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Hamburger for mobile sidebar toggle */}
      {!open ? (
        <button
          className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700 mr-2"
          aria-label="Open sidebar"
          onClick={setOpen ? () => setOpen(false) : handleSidebarToggle}
        >
          ☰
        </button>
      ) : (
        <button>
        </button>
      )}

      <input
        type="text"
        placeholder={t('search') || 'Search...'}
        value={searchTerm}
        onChange={e => setSearchTerm && setSearchTerm(e.target.value)}
        className="w-full sm:w-1/2 rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-blue-500 mb-2 sm:mb-0 pl-12 sm:pl-10"
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}
          className="px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        >
          {i18n.language === 'en' ? 'हिन्दी' : 'English'}
        </button>
        <button
          onClick={() => navigate('/auth')}
          className="px-3 py-1 rounded bg-blue-500 text-white"
        >
         {!user? t('login') : t(user.username)}
        </button>
        <DarkModeToggle />
      </div>
    </header>
  );
};

export default Header;
