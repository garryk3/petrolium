import { h } from 'preact';
import { memo, useEffect } from 'preact/compat';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import withLclz from 'utils/localization/with-lclz';
import Layout from 'ui/layout';
import Button from 'ui/button';
import IconRefresh from 'ui/icons/refresh';
import formatDate from 'utils/helpers/date-parser';

import classes from './style.pcss';

const MyCalc = ({ tr }) => {
    const dispatch: AppTypes.Dispatch = useDispatch();
    const { calcs, count, isLoading } = useSelector((state: AppTypes.Store) => ({
        calcs    : state.myCalcs.calcs,
        count    : state.myCalcs.count,
        isLoading: state.loading.effects.myCalcs.load
    }));
    const {
        header, info, updateBtn, headerDate, headerName, headerType,
        loadMoreOf, loadMoreFrom, loadMoreBtn, notFound
    } = tr;

    const onClickUpdate = (event: AppTypes.Event) => {
        const { id, type } = event.target.dataset;

        if(!(id && type)) {
            return;
        }
        dispatch.myCalcs.loadCalc({ calcId: id, type });
    };

    useEffect(() => {
        dispatch.myCalcs.load();
    }, [dispatch]);

    return (
        <Layout>
            <div className={classes.myCalc}>
                <h2>{header}</h2>
                <p>{info}</p>
                <div className={classes.myCalc__table}>
                    <div className={clsx(classes.myCalc__tableRow, classes.myCalc__tableRow_heading)}>
                        <span>{headerDate}</span>
                        <span>{headerName}</span>
                        <span>{headerType}</span>
                    </div>
                    {calcs?.length ? calcs.map((calc) => (
                        <div className={clsx(classes.myCalc__tableRow)}>
                            <span>{formatDate(calc.date, { month: 'numeric', day: 'numeric', year: 'numeric' })}</span>
                            <span>{calc.name}</span>
                            <span>{calc.groupName}</span>
                            <span onClick={onClickUpdate} data-type={calc.groupUid} data-id={calc.globUid}>
                                <IconRefresh width={20} height={20} />
                                {updateBtn}
                            </span>
                        </div>
                    )) : <p className={classes.myCalc__notFound}>{notFound}</p>}
                </div>
                <div className={classes.myCalc__pagination}>
                    {(count > calcs.length) && <Button disabled={isLoading} onClick={dispatch.myCalcs.load}>{loadMoreBtn}</Button>}

                    <span>
                        {loadMoreFrom}
                        {' '}
                        {calcs.length}
                        {' '}
                        {loadMoreOf}
                        {' '}
                        {count}
                    </span>
                </div>
            </div>
        </Layout>
    );
};

const MyCalcWithLclz = withLclz(MyCalc);

export default memo(MyCalcWithLclz);
