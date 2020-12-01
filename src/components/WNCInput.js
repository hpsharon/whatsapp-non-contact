import React from "react";
import {Col, DropdownButton, Form, Row} from "react-bootstrap";

const WNCInput = ({type, value, label, onChange, pattern, required}) => {

  const onInputChange = (e) => {
    console.log(e.target.value);
    onChange(e.target.value);
  }

  return(
    <Form.Group as={Row} controlId={label}>
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <input type={type} value={value} onChange={onInputChange} required={required} pattern={pattern} />
      </Col>
    </Form.Group>
  )

}

export default WNCInput;
