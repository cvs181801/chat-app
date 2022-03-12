import React, {createContext, useState, useEffect} from 'react'
export const ThemeContext = createContext()
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';

export default function ThemeContextProvider(props) {
    const [theme, setTheme] = useState('light');

  return (
        <ThemeContext.Provider value={{theme}}>
            {props.children}
        </ThemeContext.Provider>
  )
}


