import { h } from 'preact';
import { memo, Fragment } from 'preact/compat';
import { useDispatch, useSelector } from 'react-redux';

import formatDate from 'utils/helpers/date-parser';
// import Button from 'ui/button';
// import IconPdf from 'ui/icons/pdf';
import DiagramTypeOne from 'components/diagrams/type-one';
import DiagramTypeTwo from 'components/diagrams/type-two';
import DiagramTypeThree from 'components/diagrams/type-three';

import classes from './style.pcss';

const Result = ({ tr }) => {
    // const dispatch: AppTypes.Dispatch = useDispatch();
    const { calculateName, result } = useSelector((state: AppTypes.Store) => state.calculator);

    if(!result) {
        return null;
    }
    // const { exportBtn } = tr;
    const {
        dataType1, dataType2, dataType3, date, description, translates = {}
    } = result ?? {};
    const localizations = { ...tr, ...translates };

    return (
        <div className={classes.result}>
            <header className={classes.result__header}>
                <h3>
                    {calculateName}
                </h3>
                <h4>
                    {formatDate(date, {
                        month : 'numeric', day   : 'numeric', year  : 'numeric', hour  : 'numeric', minute: 'numeric'
                    })}
                </h4>
                {/* <Button variant="secondary" onClick={dispatch.calculator.loadPdf}>
                    <Fragment>
                        {exportBtn}
                        {' '}
                        <IconPdf />
                    </Fragment>
                </Button> */}
            </header>
            <DiagramTypeOne tr={localizations} config={dataType1} />
            <p>{description}</p>
            <div className={classes.result__diagramWrapper}>
                <DiagramTypeTwo groups={dataType2} />
                <DiagramTypeThree tr={localizations} config={dataType3} />
            </div>
        </div>
    );
};

export default memo(Result);
