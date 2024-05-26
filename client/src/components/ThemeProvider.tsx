import { useAppSelector } from '../redux/hook';
import { ThemeProviderProps } from '../types/types';

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen">
        {children}
      </div>
    </div>
  );
};
