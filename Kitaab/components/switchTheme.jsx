import { Text, TouchableOpacity} from 'react-native'
import React from 'react'

import {useThemeStore} from "../store/themeStore";


export default function SwitchTheme() {
    const {theme,setTheme} = useThemeStore();
    const handleThemeChange = () => {
        const themes = ["forest" , "retro","ocean","blossom"];
        const currentThemeIndex = themes.indexOf(
            Object.keys(theme)[0] || "retro"
        );

        const nextTheme = themes[(currentThemeIndex + 1 ) % themes.length]
        setTheme(nextTheme);
    };
    return (

        <TouchableOpacity
            onPress={handleThemeChange}
            style={{
                padding: 10,
                backgroundColor: theme.primary,
                borderRadius: 5,
                alignItems: "center",
            }}
        >
            <Text style={{ color: "white" }}>Switch Theme</Text>
        </TouchableOpacity>

    )
}