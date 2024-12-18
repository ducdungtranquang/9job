// Check browser language for i18n
export const checkBrowserLang = () => {
  if (typeof window === "undefined") return;
  return window.navigator.language.includes("vi") ||
    window.navigator.language.includes("VI")
    ? "vi"
    : "en";
};
