import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

class SignInPage extends Component {
    state = {
        currentUserID: null,
        loading: false
    }

    handleResponse = res => {
        if (res.status !== 200) 
            throw Error(res.json().message);
        return res;
    }
    
    handleError = err => {
        console.log(err);
        alert("Sign in failed. Please try again");
        this.setState({ loading: false })
    }

    handleSignIn = async _ => {
        this.setState({ loading: true })
        fetch(`/api/user/${this.state.currentUserID}`)
            .then(res => this.handleResponse(res))
            .then(_ => this.props.onSignIn(this.state.currentUserID))
            .catch(err => this.handleError(err));
    }

    loadingIcon = () => <CircularProgress />

    signInButton = () => 
        <Button 
            variant="contained" 
            color="primary" 
            disabled={this.state.currentUserID == null}
            onClick={this.handleSignIn}>
            Sign In
        </Button>

    render() {
        return (
            <div className="SignInPage">
                <br />
                <div>
                    User ID:&nbsp;&nbsp;
                    <Input 
                        onChange={e => this.setState({currentUserID: parseInt(e.target.value)})}
                        inputProps={{
                            step: 10,
                            min: 0,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }} />
                </div>
                <br />
                <div>
                    {this.state.loading ? this.loadingIcon() : this.signInButton()}
                </div>
            </div>
        );
    }
}

export default SignInPage;