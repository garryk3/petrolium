/* eslint-disable react/no-danger-with-children */
/* eslint-disable react/no-danger */
import { h } from 'preact';
import { memo, useEffect } from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';

import Layout from 'ui/layout';

import classes from './style.pcss';

const Content = () => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const { name, content, lang } = useSelector((state: AppTypes.Store) => {
        const routeName = state.router.current?.name;
        const currentLang = state.localization.lang;

        return {
            name   : routeName,
            lang   : currentLang,
            content: state.content[currentLang]?.[routeName as string]
        };
    });
    const hasContent = content && typeof content === 'string';

    useEffect(() => {
        if(!name) {
            return;
        }
        dispatch.content.load({ key: name, lang });
    }, [name, dispatch, lang]);

    return (
        <Layout>
            {hasContent ? (
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: content }} />
            ) : <div className={classes.content}><p>Not Found!</p></div>}
        </Layout>
    );
};

export default memo(Content);
