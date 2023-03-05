import React from 'react';
import Form from 'react-bootstrap/Form';

type InputProp = {
  label: string;
  value: string;
  disabled?: boolean;
};
export const Input = ({ label, value, disabled = false }: InputProp) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control disabled type="text" placeholder={value} />
    </Form.Group>
  );
};
