
export enum Directions {
    Left = 'left',
    Right = 'right',
    Top = 'top',
    Bottom = 'bottom'
}

export interface Info {
    message: string; // текст подсказки
    direction: Directions; // направление отображения подсказки, по дефолту справа
}

export interface InputProps {
    className?: string;
    labelName?: string;
    inputProps: AppTypes.AnyProps & {
        name: string; // имя с которым значение будет отправлено при сохранении
        required?: boolean;
    };
    labelSubName?: string;
    info?: Info; // если поле не заполнено, значок подсказки не отображается
    errorMessage?: string;
    valid?: boolean;
    isShowEmpty?: boolean;
    select?: string[];
}
