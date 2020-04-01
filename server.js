const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

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

app.post('/api/event', (req, res) => {
  console.log(req.body);
  res.send();
})

app.listen(port, () => console.log(`Listening on port ${port}`));