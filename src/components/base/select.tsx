import React from 'react';
import Form from 'react-bootstrap/Form';

type SelectProps = {
  label: string;
  options: { key: string; value: string }[];
  onChange: (value: string) => void;
};

export const Select = ({ label, options, onChange }: SelectProps) => {
  return (
    <Form.Select onChange={(e) => onChange(e.target.value)} aria-label="Default select example">
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
