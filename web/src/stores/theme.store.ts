import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (private browsing) — fallback to light
  }
  return 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Silently fail if localStorage unavailable
  }
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(getStoredTheme());
  const isDark = computed(() => theme.value === 'dark');

  function init() {
    applyTheme(theme.value);
  }

  function toggle() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    applyTheme(theme.value);
    persistTheme(theme.value);
  }

  function setTheme(newTheme: Theme) {
    theme.value = newTheme;
    applyTheme(newTheme);
    persistTheme(newTheme);
  }

  return {
    theme,
    isDark,
    init,
    toggle,
    setTheme,
  };
});
