import React, { useEffect, useState } from 'react';
import { Moon, Sun, Minus } from 'lucide-react';
import { useTheme } from 'nextra-theme-docs';

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 只在客户端 mounted 后再渲染，不然 SSR 初始不对
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme; // 更稳
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null; // 防止 SSR 闪烁
  }

  const currentTheme = resolvedTheme || theme;

  return (
    <div
      className="grid grid-cols-3 gap-2 place-items-center border border-gray-300 w-12 rounded-full py-1 px-3 cursor-pointer transition-colors"
      onClick={toggleTheme}
    >
      <Moon
        className={`w-3 h-3 transform transition-all duration-300 
          hover:fill-blue-500 hover:text-blue-500 dark:hover:fill-white dark:hover:text-white
          ${ currentTheme === 'dark' ? 'rotate-0  fill-blue-500 text-blue-500' : 'rotate-[-15deg]'
        }`}
      />
      <Minus className="w-3 h-3 rotate-[90deg] text-gray-500" />
      <Sun
        className={`w-3 h-3 transform transition-all duration-300 
          hover:fill-white hover:text-gray-500 dark:hover:fill-yellow-500 dark:hover:text-yellow-500
          ${ currentTheme === 'light' ? 'rotate-0 fill-yellow-500 text-yellow-500 scale-125' : 'scale-100'
        }`}
      />
    </div>
  );
};

export default ThemeSwitch;