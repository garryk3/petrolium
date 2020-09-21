import { h } from 'preact';
import { Fragment } from 'preact/compat';
import { useSelector } from 'react-redux';

import Urls from 'components/router/urls-enum';
import CircleLoader from 'ui/circle-loader/calc-loader';

import useLocalization from './use-localization';

export default function withLcls(Component: any) {
    return (...props: any[]) => {
        const path = useSelector((state: AppTypes.Store) => state.router?.current?.path);
        const { tr, isLoading } = useLocalization(decodeURI(path as string) as Urls);

        return (
            <Fragment>
                <CircleLoader show={isLoading} />
                <Component tr={tr} {...props} />
            </Fragment>
        );
    };
}
