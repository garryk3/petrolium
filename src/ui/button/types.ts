import { h } from 'preact';

export interface ButtonProps extends h.JSX.HTMLAttributes<HTMLButtonElement | any> {
    type?: 'button' | 'reset' | 'submit';
    className?: string;
    variant?: 'link' | 'secondary' | 'primary' | 'link-primary';
    arrowDirection?: 'left' | 'right';
    children: JSX.Element | string;
}
