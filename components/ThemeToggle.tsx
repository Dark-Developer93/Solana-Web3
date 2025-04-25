'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Set the default theme to system on component mount
  useEffect(() => {
    setMounted(true);
    if (!theme) {
      setTheme('system');
    }
  }, [theme, setTheme]);

  const toggleTheme = () => {
    if (!mounted) return;

    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  // Render appropriate icon based on the current theme
  const renderThemeIcon = () => {
    if (!mounted) return null;

    if (theme === 'light') {
      return <Sun className="h-[1.2rem] w-[1.2rem]" />;
    } else {
      return <Moon className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full cursor-pointer"
    >
      {renderThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
