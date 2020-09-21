import { getService } from 'utils/service-locator';

type Content = {
    [index: string]: {
        [index: string]: string;
    }
}

const initialState = {
    en: {},
    ru: {}
} as Content;

export default {
    state   : initialState,
    reducers: {
        setContent(state: Content, { key, lang, text }: { key: string; lang: string; text: string; }) {
            if(!state[lang]) {
                state[lang] = {};
            }
            state[lang][key] = text ?? '';
        }
    },
    effects: (dispatch: any) => ({
        async load({ key, lang }) {
            const { result, error } = await getService('transport').fetchContent({
                lang,
                path: key
            });

            if(error) {
                getService('errorHandler')!.process(error);
            }
            dispatch.content.setContent({ key, lang, text: result?.message ?? '' });
        }
    })
};
