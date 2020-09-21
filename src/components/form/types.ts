import { InputProps } from 'ui/form/types';

export interface InputConfig extends InputProps {
    errorText   : string; // текст ошибки валидации поля
    pattern     : RegExp;
    variant?: 'select' | 'textarea';
    select?: Array<string>; // список значений для селекта
}

export interface FormProps {
    inputConfigs: InputConfig[];
    onSubmitAction: Function;
    className?: string;
    children: JSX.Element;
    defaultValues?: null | AppTypes.AnyProps;
    showEmptyOnSubmit?: boolean;
}
