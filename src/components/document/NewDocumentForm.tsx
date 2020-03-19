import React from 'react';
import Button from '@material-ui/core/Button';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff';
import { Radios } from 'mui-rff';
import Grid from '@material-ui/core/Grid';

export interface NewDocumentFormData {
  name: string;
  description?: string;
  doctype?: string;
}

export interface NewDocumentFormProps {
  initialValues: NewDocumentFormData;
  onSubmit: any;
}

const doctypes = [
  { label: 'XFlow', value: 'xflow'},
  { label: 'Domain', value: 'domain'}
];

export function NewDocumentForm(props: NewDocumentFormProps) {
  const { initialValues, onSubmit } = props;

  async function validate(values: NewDocumentFormData) {
    if (!values.doctype) {
      return { doctype: 'Document type must be selected.' };
    }
    if (!values.name) {
      return { name: 'Document requires a name.' };
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
          <Grid container direction="column" alignContent="stretch">
            <Grid item>
              <Radios
                label="Select a document type"
                name="doctype"
                required={true}
                data={ doctypes }
                />
            </Grid>
            <Grid item>
              <TextField label="Name" name="name" required={true} />
            </Grid>
            <Grid item>
              <TextField label="Description" name="description" required={true} />
            </Grid>
            <Grid item>
              <Button variant="outlined" type="submit" color="primary">
              Go
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}



