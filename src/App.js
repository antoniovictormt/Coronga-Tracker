import React from 'react';

import { Cards, Chart, CountryPicker } from './components'
import { fechData } from './api'

import styles from './styles/App.module.css';
class App extends React.Component {
  state = {
    data: {},
  }

  async componentDidMount() {
    const fechedData = await fechData();

    this.setState({ data: fechedData })
  }

  render() {
    const { data } = this.state
    return (
      <div className={styles.container}>
        <Cards data={data} />
        <Chart />
        <CountryPicker />
      </div>
    );
  }
}

export default App;
