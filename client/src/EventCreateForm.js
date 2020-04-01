import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MultiSelectTypeGroup from './MultiSelectTypeGroup';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const handleChange = (event, callback) => {
    callback(event.target.value);
}

export default function EventCreateForm(props) {
  const classes = useStyles();


  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            Organizer User ID:&nbsp;&nbsp;
            <Input 
                defaultValue={props.organizerIDValue}
                onChange={e => handleChange(e, props.onOrganizerIDChange)}
                inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                }} />
        </div>
        <div>
            <TextField 
                required 
                label="Title" 
                defaultValue={props.titleValue} 
                onChange={e => handleChange(e, props.onTitleChange)} />
            <TextField 
                required 
                label="Location" 
                defaultValue={props.locationValue} 
                onChange={e => handleChange(e, props.onLocationChange)} />
        </div>
        <div>
            <TextField
                required
                label="Start Date and Time"
                type="datetime-local"
                defaultValue={props.startDateValue}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={e => handleChange(e, props.onStartDateChange)}
            />
            <TextField
                required
                label="End Date and Time"
                type="datetime-local"
                defaultValue={props.endDateValue}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={e => handleChange(e, props.onEndDateChange)}
            />
        </div>
        <div>
            <TextField 
                label="Description" 
                defaultValue={props.descriptionValue}
                multiline 
                rows="5"
                onChange={e => handleChange(e, props.onDescriptionChange)}
            />
            <MultiSelectTypeGroup 
                onChange={e => handleChange(e, props.onTypesChange)} />
        </div>
    </form>
  );
}