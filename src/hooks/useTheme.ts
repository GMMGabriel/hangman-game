/**
 * Hook de tema claro/escuro da aplicação.
 */
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme() {
    return useContext(ThemeContext);
}