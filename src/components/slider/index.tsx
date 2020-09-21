import { h } from 'preact';
import { memo } from 'preact/compat';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import clsx from 'clsx';

import IconChevronLeft from 'ui/icons/chevron-left';
import IconChevronRight from 'ui/icons/chevron-right';

import classes from './style.pcss';

const Slider = ({ className, options, arrowClassName }) => {
    const leftArrow = <div className={clsx(classes.slider__arrow, classes.slider__arrow_left, arrowClassName)}><IconChevronLeft width={20} height={24} /></div>;
    const rightArrow = <div className={clsx(classes.slider__arrow, classes.slider__arrow_right, arrowClassName)}><IconChevronRight width={20} height={24} /></div>;

    return (
        <div className={clsx(classes.slider, className)}>
            <Carousel
                arrows
                dots
                arrowLeft={leftArrow}
                arrowRight={rightArrow}
                addArrowClickHandler
                {...options}
            />
        </div>
    );
};

export default memo(Slider);
