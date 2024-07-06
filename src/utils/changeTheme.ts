import {themeEnum} from "@/constants";
export const changeTheme = (themeType: keyof typeof themeEnum = 'LightTheme') => {
    const dom = document.documentElement;
    const theme = themeEnum[themeType];
    Object.keys(theme).forEach(k => {
        dom.style.setProperty(k, theme[k as keyof typeof theme]);
    })
}