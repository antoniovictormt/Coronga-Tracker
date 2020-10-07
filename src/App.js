import React, { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';

import { InfoBox, Map, Table } from './components';
import logoImg from './assets/coronga_tracker.svg';

import './styles/styles.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {

          const countries = data.map((country) => ({
            name: country.country, //Brazil, Franch, Spanish
            value: country.countryInfo.iso2, //BRA, FRA, SPA
          }));

          setTableData(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === 'worldwide'
        ? "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="appHeader">
          <img src={logoImg} alt="logo" />
          <FormControl className="appDropdown">
            <Select className="select" variant="outlined" onChange={onCountryChange} value={country} >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="appStats">
          <InfoBox
            title="Confirmed cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
            subtitle="confirmed cases" />

          <InfoBox
            title="Recovered cases"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
            subtitle="recovered cases" />

          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
            subtitle="deaths" />
        </div>

        <Map />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
