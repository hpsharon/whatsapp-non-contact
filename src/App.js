import './App.css';
import React, { useState, useEffect } from 'react';
import countryTelephoneCode from "country-telephone-code";
import {Container, Row, Col, Form} from "react-bootstrap";
import WNCDropdown from './components/WNCDropdown';
const countriesQuery = require("countries-code");

function App() {

  const WHATSAPP_API_URL = 'https://wa.me/';
  const [selectedCountryCode, setSelectedCountryCode] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [availableCountries, setAvailableCountries] = useState([]);

  useEffect(() => {
    let availableCountries = countriesQuery.allCountriesList(),
        mapped = Object.assign({}, ...availableCountries.map( ({alpha2, country_name_en}) => ({[alpha2]:country_name_en})));

    setAvailableCountries(mapped);
  },[])

  const onCountryChange = (value) => {
    setSelectedCountryCode(value);
  }

  const onPhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  }

  const onFormSubmit = () => {
    window.open(WHATSAPP_API_URL + countryTelephoneCode(selectedCountryCode) + phoneNumber, '_blank');
  }

  return (
    <Container>
      <Form onSubmit={onFormSubmit}>
          <WNCDropdown
            onClick={onCountryChange}
            title={selectedCountryCode ? availableCountries[selectedCountryCode] : "Select Country"}
            label={"Select Country"}
            value={selectedCountryCode}
            options={Object.entries(availableCountries).map( ([value, display]) => ({value, display}) )}
          />
        <Row>
          <Col sm={4}><label htmlFor="phoneNumber">Phone #:</label></Col>
          <Col sm={8}><input type="tel" id={"phoneNumber"} value={phoneNumber} onChange={onPhoneNumberChange} pattern={"[0-9.]+"} required/></Col>
        </Row>
        <input type="submit" disabled={!phoneNumber || !selectedCountryCode}></input>
      </Form>
    </Container>

  );
}

export default App;
