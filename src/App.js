import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";

import { Header, InfoBox, LineGraph, Map, Table } from "./components";
import { prettyPrintStat, sortData } from "./util";
import "leaflet/dist/leaflet.css";
import "./styles/styles.css";


function App() {
  const [casesType, setCasesType] = useState("cases");
  const [country, setCountry] = useState("Worldwide");
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
            value: country.countryInfo.iso2, //BRA, FRA, SPA
          }));
          let sortedData = sortData(data);
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
      countryCode === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all" :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        countryCode === "Worldwide"
          ? setMapCenter([34.80746, -40.4796])
          : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        countryCode === "Worldwide"
          ? setMapZoom(3)
          : setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
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
            title="Confirmed cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
            subtitle="confirmed cases" />

          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            country={country}
            title="Recovered cases"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
            subtitle="recovered cases" />

          <InfoBox
            isBlack
            color="black"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            country={country}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            subtitle="deaths" />
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />
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

      <Card className="app_right">
        <CardContent>
          <h3 className="titleGraph">
            Worldwide new {casesType === "cases" ? " confirmed cases" : casesType === "recovered" ? " recovered cases" : " deaths"} by day
          </h3>
          <LineGraph className="app_graph" casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
