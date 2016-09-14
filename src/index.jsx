import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Layout, Page, PageList } from './components';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={PageList} />
      <Route path="/:title" component={Page} />
    </Route>
  </Router>
);

render(routes, document.getElementById('root'));
