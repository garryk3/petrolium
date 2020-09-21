import { h } from 'preact';

export default function IconMenu(props: AppTypes.AnyProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M22 17V19H2V17H22ZM22 11V13H2V11H22ZM22 5V7H2V5H22Z" fill="#242424" />
        </svg>
    );
}
