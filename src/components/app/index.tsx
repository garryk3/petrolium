/* eslint-disable react/no-unused-state */
import { h, Component } from 'preact';
import { Provider } from 'react-redux';
import clsx from 'clsx';

import Router from 'components/router';
import store from 'utils/store';
import Warning from 'components/warning';
import Loader from 'components/loader';
import IconWarning from 'ui/icons/warning';
import warningClasses from 'components/warning/style.pcss';

import classes from './styles.pcss';

class App extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error) {
        console.error(error);
        this.setState({ hasError: true });
    }

    render(props, state) {
        return (
            <Provider store={store}>
                <div className={classes.app} id="content">
                    <Loader />
                    {state.hasError && (
                        <div className={clsx(warningClasses.warning, classes.app__warning)}>
                            <IconWarning className={warningClasses.warning__icon} />
                            <div className={warningClasses.warning__list}>
                                <span>Something went badly wrong, reload page, please!</span>
                            </div>
                        </div>
                    )}
                    <Warning />
                    <Router />
                </div>
            </Provider>
        );
    }
}

export default App;
