/*import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';

import logoImg from '../../assets/coronga_tracker.svg';

function Header() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {

          const countries = data.map((country) => ({
            name: country.country, //Brazil, Franch, Spanish
            value: country.countryInfo.iso2, //BRA, FRA, SPA
          }));

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
        ? 'https://disease.sh/v3/covid-19/all' :
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  };

  return (
    <header>
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
    </header>
  )
}

export default Header;*/