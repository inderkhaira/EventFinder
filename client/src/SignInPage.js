import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class SignInPage extends Component {
    state = {
        currentUserID: null
    }

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
                    <Button 
                        variant="contained" 
                        color="primary" 
                        disabled={this.state.currentUserID == null}
                        onClick={_ => this.props.onSignIn(this.state.currentUserID)}>
                        Sign In
                    </Button>
                </div>
            </div>
        );
    }
}

export default SignInPage;