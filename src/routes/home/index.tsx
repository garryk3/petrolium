import { h } from 'preact';
import { memo } from 'preact/compat';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'ui/button';
import Layout from 'ui/layout';
import Urls from 'components/router/urls-enum';
import useLocalizationReloadData from 'utils/helpers/use-localization-reload-data';

import classes from './style.pcss';

const Home = () => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const { tr, groups } = useSelector((state: AppTypes.Store) => ({
        groups: state.calculator.groups,
        tr    : state.localization.translations[state.localization.lang]?.[Urls.COMMON]
    }));
    const { calculationBtn } = tr ?? {};
    const cards = Array.isArray(groups) ? groups.map((item) => ({
        title      : item.name,
        description: item.description,
        btnName    : calculationBtn,
        link       : `${Urls.CALCULATE}${item.id}`
    })) : [];

    useLocalizationReloadData([dispatch.calculator.loadCalcGroups]);

    return (
        <Layout>
            <div className={classes.home}>
                {cards.map((card) => (
                    <div className={classes.home__card}>
                        <h2>{card.title}</h2>
                        <p>{card.description}</p>
                        <Button variant="link-primary" href={card.link}>{card.btnName}</Button>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default memo(Home);
