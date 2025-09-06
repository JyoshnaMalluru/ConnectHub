import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const Sidebar = () => {
  const { t } = useTranslation();
  const user = localStorage.getItem('contenthub-user')
    ? JSON.parse(localStorage.getItem('contenthub-user'))
    : null;
  const [open, setOpen] = React.useState(false);

  // Listen for sidebar-toggle event from Header
  React.useEffect(() => {
    const handler = () => setOpen((o) => !o);
    window.addEventListener('sidebar-toggle', handler);
    return () => window.removeEventListener('sidebar-toggle', handler);
  }, []);

  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50
          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex md:flex-col md:w-64
        `}
      >
        {/* Top bar: app name and close button on mobile */}
        <div className="flex items-center justify-between py-6 border-b border-gray-200 dark:border-gray-700 px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('ContentHub')}
          </h1>
          {/* Close button only on mobile when sidebar is open */}
          <button
            className="md:hidden p-2 ml-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            style={{ display: open ? 'block' : 'none' }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t('feed')}
          </Link>
          <Link
            to="/trending"
            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t('trending')}
          </Link>
          <Link
            to="/favorites"
            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t('favorites')}
          </Link>
          <Link
            to="/settings"
            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {t('settings')}
          </Link>
        </nav>
      </aside>

      {/* Hamburger button (mobile) - hidden when sidebar is open */}
      {!open && (
        <button
          className="fixed top-4 left-4 md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700 z-50"
          onClick={() => setOpen(true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}
    </>
  );
};

export default Sidebar;
