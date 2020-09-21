import { h } from 'preact';
import { memo } from 'preact/compat';

import Menu from 'components/menu';
import Copyright from 'ui/copyright';

import classes from './style.pcss';

const Layout = ({ children }) => (
    <div className={classes.layout}>
        <Menu />
        {children}
        <Copyright className={classes.layout__copyright} />
    </div>
);

export default memo(Layout);
