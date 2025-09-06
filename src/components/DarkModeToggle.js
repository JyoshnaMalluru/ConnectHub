import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../features/userSlice';
import { useTranslation } from 'react-i18next';

const DarkModeToggle = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.user.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
    >
      {darkMode ? t('lightMode') : t('darkMode')}
    </button>
  );
};

export default DarkModeToggle;
