import { h } from 'preact';

export default function IconSuccess(props: AppTypes.AnyProps) {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22ZM11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20ZM9 12.5858L14.2929 7.29289L15.7071 8.70711L9 15.4142L5.29289 11.7071L6.70711 10.2929L9 12.5858Z"
                fill="#242424"
            />
        </svg>
    );
}
