import React from 'react';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';

export interface NewProjectFormData {
  name: string;
  description: string;
}

export interface NewProjectFormProps {
  initialValues: NewProjectFormData;
  onSubmit: any;
}

export function NewProjectForm(props: NewProjectFormProps) {
  const { initialValues, onSubmit } = props;

  async function validate(values: NewProjectFormData) {
    if (!values.name) {
      return { name: 'Project requires a name.' };
    }
    return;
  }

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={initialValues}
      validate={validate}
      render={({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit} noValidate>
          <TextField label="Name" name="name" required={true} />
          <TextField label="Description" name="description" required={true} />
          <Button variant="outlined" type="submit" color="primary">
          Go
          </Button>
        </form>
      )}
    />
  );
}


