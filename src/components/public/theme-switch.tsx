import React, { useEffect, useState } from 'react';
import { Moon, Sun, Minus } from 'lucide-react';
import { useTheme } from 'nextra-theme-docs';

const DarkLightSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme; // 更稳
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null; 
  }

  const currentTheme = resolvedTheme || theme;

  return (
    <div
      className={`group grid grid-cols-3 gap-2 place-items-center border border-gray-300 w-12 rounded-full py-1 px-3 cursor-pointer 
        transition-colors hover:border-blue-500 dark:hover:border-yellow-500`}
      onClick={toggleTheme}
    >
      <Moon
        className={`w-3 h-3 transform transition-all duration-300 
          group-hover:fill-blue-500 group-hover:text-blue-500 dark:group-hover:fill-white dark:group-hover:text-white
          ${ currentTheme === 'dark' ? 'rotate-0  fill-blue-500 text-blue-500' : 'rotate-[-15deg]'}
        `}
      />
      <Minus className="w-3 h-3 rotate-[90deg] text-gray-500" />
      <Sun
        className={`w-3 h-3 transform transition-all duration-300 
          group-hover:fill-white group-hover:text-gray-500 dark:group-hover:fill-yellow-500 dark:group-hover:text-yellow-500
          ${ currentTheme === 'light' ? 'rotate-0 fill-yellow-500 text-yellow-500 scale-125' : 'scale-100'
        }`}
      />
    </div>
  );
};

export default DarkLightSwitch;
