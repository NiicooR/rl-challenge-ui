import React from 'react';
import Form from 'react-bootstrap/Form';

type InputProp = {
  label: string;
  value: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
};
export const Input = ({ label, value, disabled, onChange }: InputProp) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        type="number"
        value={value}
      />
    </Form.Group>
  );
};
