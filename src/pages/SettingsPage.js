import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPreferences } from '../features/userSlice';
import { useTranslation } from 'react-i18next';

const ALL_CATEGORIES = ['technology', 'sports', 'finance', 'entertainment', 'health', 'science'];

const SettingsPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const preferences = useSelector((state) => state.user.preferences);
  const [selected, setSelected] = useState(preferences);

  useEffect(() => {
    setSelected(preferences);
  }, [preferences]);

  const handleToggle = (cat) => {
    setSelected((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSave = () => {
    dispatch(setPreferences(selected));
    localStorage.setItem('contenthub-preferences', JSON.stringify(selected));
    alert('Preferences saved!');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Content Preferences</h2>
      <div className="mb-4">
        {ALL_CATEGORIES.map((cat) => (
          <label key={cat} className="block mb-2">
            <input
              type="checkbox"
              checked={selected.includes(cat)}
              onChange={() => handleToggle(cat)}
              className="mr-2"
            />
            <span className="text-gray-700 dark:text-gray-200">{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default SettingsPage;
