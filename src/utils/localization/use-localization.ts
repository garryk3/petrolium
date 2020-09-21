import {
    useEffect, useState, useRef, useCallback
} from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';

import Urls from 'components/router/urls-enum';

import DEFAULT_TR from './translations';

export default function useLocalization(key: Urls) {
    const [dataLoaded, setDataLoaded] = useState(false);
    const dispatch: AppTypes.Dispatch = useDispatch();
    const {
        tr, commonTr, lang, isLoading
    } = useSelector((state: AppTypes.Store) => ({
        tr       : state.localization.translations?.[state.localization.lang]?.[key],
        commonTr : state.localization.translations?.[state.localization.lang]?.[Urls.COMMON],
        lang     : state.localization.lang,
        isLoading: state.loading.effects.localization.load
    }));
    const currentLang = useRef(lang);

    const load = useCallback(async () => {
        await dispatch.localization.load(key);
        setDataLoaded(true);
    }, [dispatch, key]);

    useEffect(() => {
        if(!tr) {
            load();
        } else {
            setDataLoaded(true);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const langChanged = currentLang.current !== lang;

        if(!langChanged) {
            return;
        }
        setDataLoaded(false);
        load();
    }, [lang, load]);

    return {
        isLoading: !dataLoaded || isLoading,
        lang,
        tr       : tr ? {
            ...tr,
            ...commonTr
        } : {
            ...DEFAULT_TR[key],
            ...DEFAULT_TR[Urls.COMMON]
        }
    };
}
