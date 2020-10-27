import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";

import { Header, InfoBox, LineGraph, Map, Table } from "./components";
import { prettyPrintStat, sortData } from "./util";
import "leaflet/dist/leaflet.css";
import "./styles/styles.css";


function App() {
  const [casesType, setCasesType] = useState("cases");
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
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
            value: country.countryInfo.iso3, //BRA, FRA, SPA
          }));
          const sortedData = sortData(data);

          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]) &&
          setMapZoom(4);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="app">
      <div className="header">
        <Header
          country={country}
          onCountryChange={onCountryChange}
          countries={countries} />

        <div className="appStats">
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            country={country}
            title="confirmed cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)} />

          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            country={country}
            title="recovered cases"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)} />

          <InfoBox
            isBlack
            color="black"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            country={country}
            title="deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)} />
        </div>
      </div>

      <div className="view">
        <div className="app_left">
          <Map
            casesType={casesType}
            center={mapCenter}
            zoom={mapZoom}
            country={mapCountries} />
        </div>

        <Card className="app_right">
          <CardContent>
            <div>
              <h3 className="titleTable">
                {casesType === "cases" ? "Confirmed cases " : casesType === "recovered" ? "Recovered cases " : "Deaths rates "}
            by Country</h3>
              <Table countries={tableData} />
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="graph">
        <Card >
          <CardContent>
            <h3 className="titleGraph">
              Worldwide new {casesType === "cases" ? " confirmed cases" : casesType === "recovered" ? " recovered cases" : " deaths"} by day
          </h3>
            <LineGraph className="app_graph" casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
