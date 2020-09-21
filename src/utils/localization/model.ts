import { getService } from 'utils/service-locator';

import { Store, SetTranslation } from './types';

const initialState = {
    lang        : process.env.DEFAULT_LANG,
    translations: {
        ru: {},
        en: {}
    },
    availableLangs: [],
    error         : null,
    langIconPaths : ''
} as Store;

export default {
    state   : initialState,
    reducers: {
        setCurrentLang(state: Store, lang: Store['lang']) {
            state.lang = lang;
        },
        setLangIconPaths(state: Store, paths: Store['langIconPaths']) {
            state.langIconPaths = paths;
        },
        setAvailableLangs(state: Store, langs: Store['availableLangs']) {
            state.availableLangs = langs;
        },
        setTranslation(state: Store, payload: SetTranslation) {
            const translations = payload ?? {};

            state.translations[state.lang] = translations;
        },
        setError(state: Store, error: AppTypes.RequestError) {
            state.error = error;
        }
    },
    effects: (dispatch: any) => ({
        async load(payload: any, store: AppTypes.Store) {
            const { result, error } = await getService('transport')!.fetchLocalization({
                lang: store.localization.lang
            });

            if(error) {
                getService('errorHandler')!.process(error);
            }
            dispatch.localization.setTranslation(result?.items ?? {});
        },
        async loadLangIcons(langs: Store['availableLangs']) {
            if(!langs.length) {
                return;
            }
            const responses = await Promise.all(langs.map((lang) => getService('transport').fetchLocalizationIcon(lang.shortName)));
            const urls = responses.map((response) => URL.createObjectURL(response.result));

            dispatch.localization.setAvailableLangs(langs.map((lang, index) => ({
                ...lang,
                url: urls[index]
            })));
        },
        async loadAvailableLangs() {
            const { result, error } = await getService('transport')!.fetchLocalizationLangs();

            if(error) {
                getService('errorHandler')!.process(error);
            }
            dispatch.localization.loadLangIcons(result?.items ?? []);
            dispatch.localization.setAvailableLangs(result?.items ?? []);
        },
        async loadInitialLocalizationData() {
            dispatch.localization.loadAvailableLangs();
            dispatch.localization.load();
        },
        setCurrentLang() {
            dispatch.localization.load();
        }
    })
};
