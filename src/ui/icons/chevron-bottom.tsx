import { h } from 'preact';

export default function ChevronBottom(props: AppTypes.AnyProps) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path fillRule="evenodd" clipRule="evenodd" d="M19.293 7.29297L20.707 8.70697L12 17.414L3.29303 8.70697L4.70703 7.29297L12 14.586L19.293 7.29297Z" fill="black" />
        </svg>
    );
}
