import { h } from 'preact';
import { memo } from 'preact/compat';
import { Link } from 'preact-router/match';
import clsx from 'clsx';

import Urls from 'components/router/urls-enum';

import classes from './style.pcss';

const Copyright = ({ className }: { className?: string; }) => (
    <div className={clsx(classes.copyright, className)}>
        <div>
        Copyright © 2020
            {' '}
            <a href="https://petroleum.digital">Digital Petroleum.</a>
            {' '}
            <span>All rights reserved.</span>
        </div>
        <div>
            <Link href={`${Urls.CONTENT}terms`}>Terms and Conditions</Link>
            {' '}
            <Link href={`${Urls.CONTENT}privacy`}>Privacy Policy</Link>
        </div>
    </div>
);

export default memo(Copyright);
