import './App.css';
import React, { useState, useEffect } from 'react';
import countryTelephoneCode from "country-telephone-code";
import {Container, Row, Col, Form} from "react-bootstrap";
import WNCDropdown from './components/WNCDropdown';
import WNCInput from './components/WNCInput';
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

  const onPhoneNumberChange = (value) => {
    setPhoneNumber(value);
  }

  const onFormSubmit = () => {
    window.open(WHATSAPP_API_URL + countryTelephoneCode(selectedCountryCode) + phoneNumber, '_blank');
  }

  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col>
          <Form onSubmit={onFormSubmit}>
            <WNCDropdown
              onClick={onCountryChange}
              title={selectedCountryCode ? availableCountries[selectedCountryCode] : "Select Country"}
              label={"Select Country"}
              value={selectedCountryCode}
              options={Object.entries(availableCountries).map( ([value, display]) => ({value, display}) )}
            />
            <WNCInput
              value={phoneNumber}
              pattern={"[0-9.]+"}
              onChange={onPhoneNumberChange}
              type={"tel"}
              required={true}
              label={"Phone #:"}
            />
            {/*<input type="submit" disabled={!phoneNumber || !selectedCountryCode}></input>*/}
          </Form>
        </Col>
        <Col></Col>
      </Row>

    </Container>
  );
}

export default App;
