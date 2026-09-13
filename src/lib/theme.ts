export function isDarkTheme() {
  return document.documentElement.classList.contains("dark");
}

/**
 * Calls `onChange` only when the `dark` class actually flips.
 * Other class changes on <html> (Lenis, theme-switching) are ignored.
 */
export function observeTheme(onChange: (isDark: boolean) => void) {
  const root = document.documentElement;
  let current = root.classList.contains("dark");

  const observer = new MutationObserver(() => {
    const next = root.classList.contains("dark");
    if (next !== current) {
      current = next;
      onChange(next);
    }
  });

  observer.observe(root, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
