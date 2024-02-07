import { Theme } from '@/shared/consts/theme';
import { useTheme } from '@/shared/hooks/useTheme';
import { Icon } from '@/shared/ui';

export const SwitchButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div onClick={toggleTheme}>
      {theme === Theme.DARK ? (
        <Icon type="Moon" className="Dark" size={24} />
      ) : (
        <Icon type="Light" className="Light" size={24}/>
      )}
    </div>
  );
};
