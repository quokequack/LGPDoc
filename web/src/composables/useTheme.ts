import { onMounted } from 'vue';
import { useThemeStore } from '@/stores/theme.store';

export function useTheme() {
  const themeStore = useThemeStore();

  onMounted(() => {
    themeStore.init();
  });

  return {
    theme: themeStore.theme,
    isDark: themeStore.isDark,
    toggle: themeStore.toggle,
    setTheme: themeStore.setTheme,
  };
}
