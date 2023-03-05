import React from 'react';
import Form from 'react-bootstrap/Form';

type SelectProps = {
  label: string;
  options: { key: string; value: string }[];
};

export const Select = ({ label, options }: SelectProps) => {
  return (
    <Form.Select aria-label="Default select example">
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
