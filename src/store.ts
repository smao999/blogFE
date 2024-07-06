import {create} from "zustand";
import {persist} from "zustand/middleware";

import {themeEnum} from "@/constants";

interface IStore {
    themeType: keyof typeof themeEnum; // 主题类型
    setThemeType: (key:keyof typeof themeEnum) => void; // 设置主题
}

const store = create<IStore>()(
    persist(
        (set) => ({
            themeType: 'LightTheme',
            setThemeType: (key) => set(() => ({ themeType: key }))
        }),
        {
            name: 'globalStore',
            partialize: state =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => ['themeType'].includes(key))
                ),
        }
    )
)

export default store;
