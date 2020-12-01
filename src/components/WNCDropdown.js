import {DropdownButton, Dropdown, Form, Row, Col} from "react-bootstrap";
import React from "react";

const WNCDropdown = ({title, options, label, onClick}) => {

  const addOptions = () => {
    return options.map(({display, value}) => <Dropdown.Item key={value} eventKey={value}>{display}</Dropdown.Item>)
  }

  const onDropdownSelect = (value) => {
    onClick(value);
  }

  return (
    <Form.Group as={Row} controlId={label}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <DropdownButton
          onSelect={onDropdownSelect}
          value
          sm={6}
          title={title}>
          {addOptions()}
        </DropdownButton>
      </Col>
    </Form.Group>
  )
}

export default WNCDropdown;
