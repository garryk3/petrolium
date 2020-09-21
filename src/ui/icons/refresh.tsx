import { h } from 'preact';

export default function IconRefresh(props: AppTypes.AnyProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            {/* eslint-disable-next-line max-len */ }
            <path fillRule="evenodd" clipRule="evenodd" d="M6.19306 7H10V9H3V2H5V5.27035C6.72511 3.18251 9.19577 2 12 2C17.5228 2 22 6.47715 22 12C20 12 22 12 20 12C20 7.58172 16.4183 4 12 4C9.60638 4 7.55354 5.0787 6.19306 7ZM17.8069 17H14V15H21V22H19V18.7297C17.2749 20.8175 14.8042 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C14.3936 20 16.4465 18.9213 17.8069 17Z" fill="black" />
        </svg>
    );
}
