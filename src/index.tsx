import { h, render } from 'preact';

import App from 'components/app';

const node = document.getElementById('app');

function renderApp() {
    render(<App />, node!);
}

renderApp();

if(module.hot) module.hot!.accept(renderApp);
