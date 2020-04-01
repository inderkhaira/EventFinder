import React, { Component } from 'react';
import LayoutTabs from './LayoutTabs';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import EventDisplayer from './EventDisplayer';
import EventCreater from './EventCreater';

import './App.css';

class App extends Component {
  state = {
    userID: null
  };
  
  eventDisplayer = () =>
    <EventDisplayer userID={this.state.userID} />
  
  eventCreater =() =>
    <EventCreater userID={this.state.userID} />

  signUpPage =() =>
    <SignUpPage />
  
  signInPage = () => 
    <SignInPage 
      onSignIn={value => this.setState({userID: value})}
    />

  userLayoutTabs = () => 
    <LayoutTabs 
      tab1Label="Sign In" 
      tab1Content={this.signInPage()}
      tab2Label="Sign Up"
      tab2Content={this.signUpPage()} />

      
  eventLayoutTabs = () => 
    <LayoutTabs 
      tab1Label="Find Events" 
      tab1Content={this.eventDisplayer()}
      tab2Label="Create An Event"
      tab2Content={this.eventCreater()} />

  render() {
      return (
        <div className="App">
          {this.state.userID == null ?
            this.userLayoutTabs() :
            this.eventLayoutTabs() }
        </div>
      );
    }
}

export default App;