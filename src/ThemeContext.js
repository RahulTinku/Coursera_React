import {createContext, useContext, useState} from 'react';

// export const ThemeProvider = ({ children }) => children;

//export const useTheme = () => ({ theme: "light" });

const ThemeContext = createContext(undefined)

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('dark');
    return <ThemeContext.Provider 
                value={{
                    theme, 
                    toggleTheme : () => setTheme(theme === 'light' ? 'dark' : 'light')
                }}>
                    {children}
            </ThemeContext.Provider>
}

export const useTheme = ()=> useContext(ThemeContext)