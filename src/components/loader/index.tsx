import { h } from 'preact';
import { useMemo } from 'preact/compat';
import { useSelector } from 'react-redux';

import classes from './style.pcss';

export default function Loader() {
    const loadingEffects = useSelector((state: AppTypes.Store) => state.loading.effects);
    const isLoading = useMemo(() => Object.values(loadingEffects).some((model) => Object.values(model).some(Boolean)), [loadingEffects]);

    if(!isLoading) {
        return null;
    }
    return (
        <div className={classes.loader}>
            <div className={classes.loader__content} />
        </div>
    );
}
