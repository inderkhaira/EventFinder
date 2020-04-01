import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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

export default function SignUpForm(props) {
  const classes = useStyles();


  return (
    <form className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField 
                required 
                label="First Name" 
                defaultValue={props.firstNameValue} 
                onChange={e => handleChange(e, props.onFirstNameChange)} />
            <TextField 
                required 
                label="Last Name" 
                defaultValue={props.lastNameValue} 
                onChange={e => handleChange(e, props.onLastNameChange)} />
        </div>
        <div>
            <TextField
                required
                label="Date of Birth"
                type="date"
                defaultValue={props.startDateValue}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={e => handleChange(e, props.onDateOfBirthChange)}
            />
            <InputLabel>Gender</InputLabel>
            <Select
                defaultValue={props.genderValue}
                onChange={e => handleChange(e, props.onGenderChange)}
            >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
            </Select>
        </div>
        <div>
            <TextField 
                required
                label="Credit Card Number" 
                defaultValue={props.cardNumberValue}
                onChange={e => handleChange(e, props.onCardNumberChange)}
            />
            <TextField
                required
                label="Expiry Date"
                type="month"
                defaultValue={props.expiryDateValue}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={e => handleChange(e, props.onExpiryDateChange)}
            />
            <TextField 
                required 
                label="Holder Name" 
                defaultValue={props.holderNameValue} 
                onChange={e => handleChange(e, props.onHolderNameChange)} 
            />
            <div>
                CVC:&nbsp;&nbsp;
                <Input 
                    onChange={e => handleChange(e, props.onCVCChange)} 
                    inputProps={{
                        step: 10,
                        min: 0,
                        max: 999,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }} />
            </div>
        </div>
    </form>
  );
}