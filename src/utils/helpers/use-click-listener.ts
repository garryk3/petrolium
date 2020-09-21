import { useEffect } from 'preact/compat';

export default function useClickListener(targetNodeClass, onClose) {
    const watchClick = (event: AppTypes.Event) => {
        const isInnerClick = event.target.classList.contains(targetNodeClass) || event.target.closest(targetNodeClass);

        if(isInnerClick) {
            return;
        }
        onClose();
    };

    useEffect(() => {
        document.addEventListener('click', watchClick);

        return () => {
            document.removeEventListener('click', watchClick);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
