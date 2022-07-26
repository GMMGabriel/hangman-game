import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isKey?: boolean;
};

export function Button({ isKey = false, ...props }: ButtonProps) {
    return (
        <button
            className={`button ${isKey ? 'isKey' : ''}`}
            {...props}
        />
    )
}