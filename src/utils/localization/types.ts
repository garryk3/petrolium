export interface Store {
    lang        : string;
    translations: {
        [index: string] : {
            [index: string]: {
                [index: string]: string;
            };
        }
    },
    error: AppTypes.RequestError | null;
    availableLangs: {
        name: string;
        shortName: string;
        icoPath: string;
        url: string;
    }[];
    langIconPaths: string;
}

export interface SetTranslation {
    [index: string]: {
        [index: string]: string;
    };
}
