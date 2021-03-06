const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Find events with the given filters on location, title,
// organizerName, types, startDate, endDate
app.post('/api/events', (req, res) => {
  console.log(req.body);
  res.send(
    [
      {
        EventID: 0,
        Title: 'CPSC 304 Final Exam',
        StartDate: new Date(2020, 1, 2, 10, 0, 0, 0),
        EndDate: new Date(2020, 1, 2, 12, 0, 0, 0),
        Description: 'In person final exam. All students must attend',
        LocationAddress: '6245 Agronomy Rd, Vancouver, BC V6T 1Z4',
        OrganizerUserID: 0,
        OrganizerName: 'Bob Smith',
        Attendees: ["Jack Ding", "Bob Smith", "Alex Doe"],
        Types: ["study"]
      },
      {
        EventID: 1,
        Title: 'CPSC 304 Review Session',
        StartDate: new Date(2020, 1, 1, 10, 0, 0, 0),
        EndDate: new Date(2020, 1, 1, 12, 0, 0, 0),
        Description: 'Optional review session',
        LocationAddress: '6245 Agronomy Rd, Vancouver, BC V6T 1Z4',
        OrganizerUserID: 1,
        OrganizerName: 'Jacky Ding',
        Attendees: ["Jack Ding", "Bob Smith", "Alex Doe", "Chris Burton"],
        Types: ["study", "group event"]
      }
    ]
  )
})

// Create an event given its organizerID, title, location,
// types (as an array of type), startDate, endDate, description
app.post('/api/event', (req, res) => {
  console.log(req.body);
  res.send();
})

// Delete the event with given eventID
app.delete('/api/event/:eventID', (req, res) => {
  console.log(req.params.eventID);
  res.send();
})

// User with userID joins event with eventID. Create such
// entry in Participate table
app.put('/api/event/:eventID/user/:userID', (req, res) => {
  console.log(req.params.eventID);
  console.log(req.params.userID);
  res.send();
})

// Create a user with the given firstName, lastName, dateOfBirth,
// gender, cardNumber, expiryDate, holderName and CVC
app.post('/api/user', (req, res) => {
  console.log(req.body);
  res.send({ userID: 0 });
})

// Send status code 200 if a user with the given userID exists,
// 404 otherwise.
app.get('/api/user/:userID', (req, res) => {
  console.log(req.params.userID);
  res.send();
})

app.listen(port, () => console.log(`Listening on port ${port}`));