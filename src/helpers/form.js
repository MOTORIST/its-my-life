import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

export const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
  <TextField
    label={label}
    error={touched && !!error}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

export const renderSwitch = ({input, label}) => (
  <FormControlLabel
    control={
      <Switch
        checked={!!input.value}
        onChange={input.onChange}
      />
    }
    label={label}
  />
);