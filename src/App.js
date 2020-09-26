import React from 'react';

import { Cards, Chart, CountryPicker } from './components'
import { fechData } from './api'

import GlobalStyles from './styles/global';

class App extends React.Component {
  state = {
    data: {},
  }

  async componentDidMount() {
    const fechedData = await fechData();

    this.setState({ fechedData })
  }

  render() {
    const { data } = this.state
    return (
      <div className="container">
        <GlobalStyles />
        <Cards data={data} />
        <Chart />
        <CountryPicker />
      </div>
    );
  }
}

export default App;
