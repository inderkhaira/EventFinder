import React, { Component } from 'react';
import SignUpForm from './SignUpForm';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// import './SignUp.css';

class SignUpPage extends Component {
    state = {
        firstName: null,
        lastName: null,
        dateOfBirth: null,
        gender: "",
        cardNumber: null,
        expiryDate: null,
        holderName: null,
        CVC: null,
        loading: false
    }

    handleResponse = res => {
        if (res.status !== 200) 
            throw Error(res.json().message);
        return res;
    }

    handleError = err => {
        console.log(err);
        alert("Failed to create user. Please try again");
        this.setState({loading: false})
    }

    handleCreateUser = async () => {
        this.setState({loading: true});

        fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                dateOfBirth: this.state.dateOfBirth,
                gender: this.state.gender,
                cardNumber: this.state.cardNumber,
                expiryDate: this.state.expiryDate,
                holderName: this.state.holderName,
                CVC: this.state.CVC
            })})
            .then(res => this.handleResponse(res).json())
            .then(body => alert(`User created successfully! Your user ID is ${body.userID}`))
            .then(_ => this.setState(
                { 
                    firstName: null,
                    lastName: null,
                    dateOfBirth: null,
                    gender: "",
                    cardNumber: null,
                    expiryDate: null,
                    holderName: null,
                    CVC: null,
                    loading: false
                }))
            .catch(err => this.handleError(err));
    }

    getCreateDisabled = () => 
        (this.state.firstName == null || 
            this.state.lastName == null || 
            this.state.dateOfBirth == null || 
            this.state.gender === "" ||
            this.state.cardNumber == null || 
            this.state.expiryDate == null || 
            this.state.holderName == null || 
            this.state.CVC == null
            );
    
    
    loadingIcon = () => <CircularProgress />

    createForm = () => 
        <div>
            <SignUpForm 
                firstNameValue={this.state.firstName}
                lastNameValue={this.state.lastName}
                dateOfBirthValue={this.state.dateOfBirth}
                genderValue={this.state.gender}
                cardNumberValue={this.state.cardNumber}
                expiryDateValue={this.state.expiryDate}
                holderNameValue={this.state.holderName}
                CVCValue={this.state.CVC}
                onFirstNameChange={value => this.setState({firstName: value})}
                onLastNameChange={value => this.setState({lastName: value})}
                onDateOfBirthChange={value => this.setState({dateOfBirth: value})}
                onGenderChange={value => this.setState({gender: value})}
                onCardNumberChange={value => this.setState({cardNumber: parseInt(value)})}
                onExpiryDateChange={value => this.setState({expiryDate: value})}
                onHolderNameChange={value => this.setState({holderName: value})}
                onCVCChange={value => this.setState({CVC: parseInt(value)})}
                />
            <br />
            <div>
                <Button 
                    variant="contained" 
                    color="primary" 
                    disabled={this.getCreateDisabled()}
                    onClick={this.handleCreateUser}>
                    Sign Up
                </Button>
            </div>
        </div>

    render() {
        return (
            <div>
                {this.state.loading ?
                    this.loadingIcon() :
                    this.createForm()}
            </div>
        );
    }
}

export default SignUpPage;