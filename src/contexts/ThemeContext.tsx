import { createContext, ReactNode, useEffect, useState } from "react";

type ThemeContextType = { // tipo do contexto do tema
  theme: string;
  changeTheme(newTheme: string): void;
}

type ThemeContextProviderProps = {
  children: ReactNode
}

// Criando um contexto do tipo ThemeContextType
export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider(props: ThemeContextProviderProps) {
  const [theme, setTheme] = useState(() => {
    console.log("localStorage - INÍCIO")
    const storageValue = localStorage.getItem('theme')
    if (storageValue) {
      console.log("localStorage - MEIO")
      return storageValue
    }
    localStorage.setItem('theme', 'theme-blue')
    console.log("localStorage - FIM")
    return 'theme-blue'
  });

  function inEffect() {
    console.log("Teste")
    const newTheme = localStorage.getItem('theme')
    document.body.id = newTheme ?? 'theme-blue'
  }

  function changeTheme(newTheme: string) {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  useEffect(() => {
    const unsubscribe = inEffect;
    // Sempre que é declarado um eventListener, é obrigatório se "descadastrar" desse evento no final do useEffect. (essa é uma boa prática)
    return () => {
      unsubscribe();
    }
  }, [, theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}