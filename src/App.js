import React, { useState, useEffect } from "react";
import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";

import { InfoBox, LineGraph, Map, Table } from "./components";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

import logoImg from "./assets/coronga_tracker.svg";

import "./styles/styles.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapCountries, setMapCountries] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);

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

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === 'worldwide'
        ? "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4)

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

        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />
      </div>

      <Card className="app_right">
        <CardContent>
          <h3 className="titleTable">Live Cases By Country</h3>
          <Table countries={tableData} />
          <h3 className="titleGraph">Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
