import {createBrowserHistory} from 'history';

const browserHistory = createBrowserHistory();

browserHistory.listen(() => {
  window.scrollTo(0, 0);
});

export default browserHistory;