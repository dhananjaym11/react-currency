import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './utility/Layout';
import HomeContainer from './containers/Home/Home';
import ConversionsContainer from './containers/Conversions/Conversions';
import ChartContainer from './containers/Chart/Chart';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path="/" component={HomeContainer} />
              <Route exact path="/conversions" component={ConversionsContainer} />
              <Route exact path="/chart" component={ChartContainer} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
