import React from 'react';
import Form from 'react-bootstrap/Form';

type SelectProps = {
  label: string;
  options: { key: string; value: string }[];
  onChange: (value: string) => void;
  disabled: boolean;
};

export const Select = ({ label, options, onChange, disabled }: SelectProps) => {
  return (
    <Form.Select disabled={disabled} onChange={(e) => onChange(e.target.value)} aria-label="Default select example">
      <option>{label}</option>
      {options.map((e) => {
        return (
          <option value={e.key} key={e.key}>
            {e.value}
          </option>
        );
      })}
    </Form.Select>
  );
};
