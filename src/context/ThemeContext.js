import React, { createContext, useState } from "react";
import Colors from "../constants/Colors";

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [themeState, setThemeState] = useState("light");
    const [themeColors, setThemeColors] = useState(Colors.lightTheme);

    const setTheme = (theme) => {
        if (theme === "light") {
            setThemeColors(Colors.lightTheme);
            setThemeState("light");
        } else if (theme === "dark") {
            setThemeColors(Colors.darkTheme);
            setThemeState("dark");
        }
    };

    return (
        <ThemeContext.Provider value={{setTheme, themeColors, themeState}}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext }