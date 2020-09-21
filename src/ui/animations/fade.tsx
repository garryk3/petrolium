import { h } from 'preact';
import { Transition } from 'react-transition-group';

const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity   : 0
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered : { opacity: 1 },
    exiting : { opacity: 0 },
    exited  : { opacity: 0 }
};

const Fade = ({ isVisible, children }:{ isVisible: boolean; children: JSX.Element }) => (
    <Transition in={isVisible} timeout={duration} unmountOnExit>
        {(state) => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
            }}
            >
                {children}
            </div>
        )}
    </Transition>
);

export default Fade;
