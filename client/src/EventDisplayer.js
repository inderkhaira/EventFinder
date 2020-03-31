import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'antd';

import './EventDisplayer.css';

const { RangePicker } = DatePicker;


class EventDisplayer extends Component {
    state = {
        events: [],
        loading: false,
        fromDate: null,
        toDate: null
    }

    handleResponse = res => {
        if (res.status !== 200) 
            throw Error(res.json().message);
        return res.json();
    }
    
    updateEvents = async () => {
        this.setState({ loading: true });
        
        fetch('/api/events')
            .then(res => this.handleResponse(res))
            .then(body => this.setState({ events: body, loading: false }))
            .catch(err => console.log(err));
    }

    handleDateChange = (value, dateString) => console.log(value, dateString)

    handleDateOK = value => console.log(value)

    loadingIcon = () => <CircularProgress />

    render() {
        return(
            <div className="EventDisplayer">
                <Container>
                    <TextField id="outlined-basic" label="Title" variant="outlined" /> 
                    <br />
                    <Button variant="contained" color="primary" onClick={this.updateEvents}>
                        Search
                    </Button>
                    <RangePicker
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={this.handleDateChange}
                        onOk={this.handleDateOK}
                    />
                </Container>
                <br />
                <Container>
                    {this.state.loading ? 
                        this.loadingIcon() :
                        this.state.events.map(event => 
                            <Card key={event.EventID}>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {event.Title}   
                                    </Typography>
                                    <Typography variant="body2" component="p" style={{ marginLeft: "10px" }}>
                                        Start Time: {event.StartDate} <br />
                                        End Time: {event.EndDate} <br />
                                        Description: {event.Description} <br />
                                        Location: {event.LocationAddress} <br />
                                        Organizer: {event.OrganizerName}
                                    </Typography>
                                </CardContent>
                            </Card>
                    )}
                </Container>
            </div>
        );
    }
}

export default EventDisplayer;