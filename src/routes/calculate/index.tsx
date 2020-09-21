import { h } from 'preact';
import { memo } from 'preact/compat';
import { useSelector } from 'react-redux';

import Calculator from 'components/calculator';

const Calculate = () => {
    const key = useSelector((state: AppTypes.Store) => state.router.current?.name);

    return <Calculator key={key} />;
};

export default memo(Calculate);
