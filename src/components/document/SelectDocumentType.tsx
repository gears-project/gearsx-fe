import React from 'react';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form';
import { Radios } from 'mui-rff';

import doctypes from 'doctypes';

export interface SelectDocumentTypeFormData {
}

export interface SelectDocumentTypeFormProps {
  initialValues: SelectDocumentTypeFormData;
  onSubmit?: any;
}

export function SelectDocumentType(props: SelectDocumentTypeFormProps) {
  const { initialValues, onSubmit } = props;

  async function validate(values: SelectDocumentTypeFormData) {
    return;
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>

          <Radios
            label="Select one..."
            name="doctype"
            required={true}
            data={doctypes}
          />
          <Button variant="outlined" type="submit" color="primary">
          Go
          </Button>
        </form>
      )}
    />
  );
}




