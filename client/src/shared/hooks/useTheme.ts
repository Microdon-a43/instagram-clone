import { ThemeContext } from '@/app/provider';
import { useContext } from 'react';
import { Theme } from '../consts/theme';

interface IUseTheme {
  theme: Theme
  toggleTheme: () => void
}

export const useTheme = (): IUseTheme => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    if (theme === Theme.DARK) {
      setTheme?.(Theme.LIGHT);
    } else {
      setTheme?.(Theme.DARK);
    }
  };

  return {
    toggleTheme,
    theme
  };
};
