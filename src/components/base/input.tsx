import React from 'react';
import Form from 'react-bootstrap/Form';

type InputProp = {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  onChange?: (value: string) => void;
};
export const Input = ({ label, value, placeholder, disabled, onChange, min = 0 }: InputProp) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        min={min}
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
        type="number"
        value={value}
      />
    </Form.Group>
  );
};
