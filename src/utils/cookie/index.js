import Cookies from 'js-cookie';

const MAIN_KEY = "NINEJOB_ADMIN__";

export const saveToCookieStorage = (name, value) => {
    Cookies.set(MAIN_KEY + name, value)
}

export const getItemFromCookieStorage = (name) => {
    return Cookies.get(MAIN_KEY + name)
}
export const removeFromCookieStorage = (name) => {
    Cookies.remove(MAIN_KEY + name, { path: '/' })
}