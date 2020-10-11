import React from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";

import logoImg from "../../assets/coronga_tracker.svg";

import "./styles.css";

function Header({ onCountryChange, country, countries }) {
  return (
    <div className="appHeader">
      <img src={logoImg} alt="logo" />
      <FormControl className="appDropdown">
        <Select className="select" variant="outlined" onChange={onCountryChange} value={country} >
          <MenuItem value="Worldwide">Worldwide</MenuItem>
          {countries.map(country => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default Header;
