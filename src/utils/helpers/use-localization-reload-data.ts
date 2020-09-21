import { useEffect, useRef } from 'preact/compat';
import { useSelector } from 'react-redux';

export default function useLocalizationReloadData(actions: Function[]) {
    const lang = useSelector((state: AppTypes.Store) => state.localization.lang);
    const lastLang = useRef(lang);

    useEffect(() => {
        if(lastLang.current === lang) {
            return;
        }
        lastLang.current = lang;
        actions.forEach((action) => action());
    }, [lang, actions]);
}
