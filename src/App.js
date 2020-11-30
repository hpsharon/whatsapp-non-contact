import './App.css';
import React, { useState, useEffect } from 'react';
import countryTelephoneCode from "country-telephone-code";
const countriesQuery = require("countries-code");

function App() {

  const WHATSAPP_API_URL = 'https://wa.me/';
  const [selectedCountry, setSelectedCountry] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState("");


  const renderCountriesOptions = () => {
    return countriesQuery.allCountriesList().map(({country_name_en, alpha2}) => <option key={alpha2} value={alpha2}>{country_name_en}</option>)
  }

  const onCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  }

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  }

  const onFormSubmit = () => {
    window.open(WHATSAPP_API_URL + countryTelephoneCode(selectedCountry) + phoneNumber, '_blank');
  }

  return (
    <div className="App">
      <form onSubmit={onFormSubmit}>
        <div className="form-item">
          <label htmlFor="countryDropdown">Select Country:</label>
          <select id="countryDropdown" onChange={onCountryChange} value={selectedCountry} >
            <option key={null} value={undefined}>Select Country</option>
            {renderCountriesOptions()}
          </select>
        </div>
        <div className="form-item">
          <label htmlFor="phoneNumber">Phone #:</label>
          <input type="tel" id={"phoneNumber"} value={phoneNumber} onChange={onPhoneNumberChange} pattern={"[0-9.]+"} required/>
        </div>
        <input type="submit" disabled={!phoneNumber || !selectedCountry}></input>
      </form>
    </div>
  );
}

export default App;
