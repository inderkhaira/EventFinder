import React, { Component } from 'react';
import EventCreateForm from './EventCreateForm';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './EventCreater.css';

class EventCreater extends Component {
    state = {
        organizerID: null,
        title: null,
        location: null,
        types: [],
        startDate: null,
        endDate: null,
        description: null,
        loading: false
    }

    handleResponse = res => {
        if (res.status !== 200) 
            throw Error(res.json().message);
        return res;
    }

    handleError = err => {
        console.log(err);
        alert("Failed to create event. Please try again");
        this.setState({loading: false})
    }

    handleCreateEvent = async () => {
        this.setState({loading: true});

        fetch('/api/event', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                organizerID: this.state.organizerID,
                title: this.state.title,
                location: this.state.location,
                types: this.state.types,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                description: this.state.description
            })})
            .then(res => this.handleResponse(res))
            .then(_ => this.setState(
                { 
                    organizerID: null,
                    title: null,
                    location: null,
                    types: [],
                    startDate: null,
                    endDate: null,
                    description: null,
                    loading: false
                }))
            .catch(err => this.handleError(err));
    }

    getCreateDisabled = () => 
        (this.state.organizerID == null ||
            this.state.title == null || 
            this.state.location == null || 
            this.state.startDate == null || 
            this.state.endDate == null);
    
    
    loadingIcon = () => <CircularProgress />

    createForm = () => 
        <div>
            <EventCreateForm 
                organizerIDValue={this.state.organizerID}
                titleValue={this.state.title}
                locationValue={this.state.location}
                startDateValue={this.state.startDate}
                endDateValue={this.state.endDate}
                descriptionValue={this.state.description}
                onOrganizerIDChange={value => this.setState({organizerID: parseInt(value)})}
                onTitleChange={value => this.setState({title: value})}
                onLocationChange={value => this.setState({location: value})}
                onTypesChange={value => this.setState({types: value})}
                onStartDateChange={value => this.setState({startDate: value})}
                onEndDateChange={value => this.setState({endDate: value})}
                onDescriptionChange={value => this.setState({description: value})}
                />
            <div>
                <Button 
                    variant="contained" 
                    color="primary" 
                    disabled={this.getCreateDisabled()}
                    onClick={this.handleCreateEvent}>
                    Create Event
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

export default EventCreater;