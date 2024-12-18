const MAIN_KEY = "NINEJOB_ADMIN__";

export const setLocalStorage = (subKey, data) => {
  if (typeof window === "undefined") return;

  return window.localStorage.setItem(MAIN_KEY + subKey, JSON.stringify(data));
};

export const getFromLocalStorage = (subKey) => {
  if (typeof window === "undefined") return null;
  const data = window.localStorage.getItem(MAIN_KEY + subKey);
  if (data) {
    return JSON.parse(data);
  }
};

export const removeFromLocalStorage = (subKey) => {
  if (typeof window === "undefined") return null;

  return window.localStorage.removeItem(MAIN_KEY + subKey);
};

export const clearLocalStorage = () => {
  if (typeof window === "undefined") return null;

  return window.localStorage.clear();
};
