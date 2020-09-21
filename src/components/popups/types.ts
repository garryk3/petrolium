export interface PopupProps {
    isVisible: boolean;
    onClose: any;
    onSubmit?: any;
    tr: {
        [index: string]: string;
    }
}
