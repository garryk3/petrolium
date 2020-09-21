import { h } from 'preact';
import { memo } from 'preact/compat';

import Layout from 'ui/layout';

import classes from './style.pcss';

const Error = () => (
    <Layout>
        <div className={classes.error}>
            <h2>404</h2>
            <p>Page not found!</p>
        </div>
    </Layout>
);

export default memo(Error);
