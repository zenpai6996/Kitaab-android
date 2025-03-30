import {create} from "zustand";
import COLORS from "../constants/colors";
import {useTheme} from "@react-navigation/native";

const themes = {
    forest: {
        primary: "#4CAF50",
        textPrimary: "#2e5a2e",
        background: "#e8f5e9",
    },
    retro: {
        primary: "#e17055",
        textPrimary: "#784e2d",
        background: "#ede1d1",
    },
    ocean: {
        primary: "#1976D2",
        textPrimary: "#1a4971",
        background: "#e3f2fd",
    },
    blossom: {
        primary: "#EC407A",
        textPrimary: "#7d2150",
        background: "#fce4ec",
    },
};

export const useThemeStore = create((set) => ({
    theme: themes.retro, // Default theme
    setTheme: (themeName) => set({ theme: themes[themeName] || themes.retro }),
}));