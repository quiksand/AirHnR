const config = require('../config');
const db = require('../database');
const express = require('express');
const app = express();
const lib = require('../lib')

app.use('/assets', express.static(__dirname + '/../client/src/assets'))
app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/listings/:listingId', (req, res) => {
  db.getListingInfo(parseInt(req.params.listingId)).then(row => {
    res.status(200).json(row);
  }).catch(err => {
    console.log(err);
    res.status(503).end();
  });
});

app.get('/api/bookings/:userId', (req, res) => {
  db.getBookingsByUserId(parseInt(req.params.userId)).then(rows => {
    res.status(200).json(rows);
  }).catch(err => {
    console.log(err);
    res.status(503).end();
  });
});

app.get('/api/listings',function(req, res) {
  //return all listings near the searched area
  lib.getPlaceCoordinates(req.query.q, googleResults => {
    db.getListingsNear(googleResults.lat, googleResults.lon, req.query.start, req.query.end)
    .then(dbResults => {
        res.status(200).json({
          listings: dbResults,
          mapCenter: {
            latitude: googleResults.lat, 
            longitude: googleResults.lon
          }
        });
      }).catch(err => {
        console.warn(err);
        res.status(503).end();
      });
  });
});

app.post('/api/markings', function (req, res) {
  //return all listings near the searched area
  let radius = -(2000 * req.body.zoom) + 30000;
  let limit = -(38 * req.body.zoom) + 513;
  limit = limit < 25 ? 25 : limit;
  radius = radius < 2000 ? 2000 : radius;
  db.getListingsNear(req.body.latitude, req.body.longitude, req.body.start, req.body.end, radius, limit)
    .then(dbResults => {
      res.status(200).json({
        listings: dbResults
      });
    }).catch(err => {
      console.warn(err);
      res.status(503).end();
    });
});

app.post('/api/bookings', (req, res) => {
  db.saveBookingInDB(req.body).then(response => {
    res.send('Booking successful');
  }).catch( err => {
    console.log('error from api bookings post', err)
    res.send('Booking failed');
  });
});

app.post('/api/users', (req, res) => {
  let userData = req.body;
  lib.hashPassword(req.body.password).then((hash) => {
    console.log(hash);
    db.saveUserInDB({ 
      first_name: userData.name,
      last_name: userData.lastName,
      password: hash,
      email: userData.email,
      phone_number: userData.phoneNumber,
      address_street: userData.addressStreet,
      address_city: userData.addressCity,
      address_region: userData.addressRegion,
      address_postal_code: userData.addressPostalCode
    }).then(response => {
      console.log('THEN RESPONSE: ', response);
      res.json({
        ok: true,
        message: 'Account created.'
      });
    }).catch( err => {
      console.log('CATCH: ', err);
      if (err.constraint === 'users_email_unique') {
        res.json({
          ok: false,
          message: 'Email already taken, please choose another one'
        });
      }
    });
  });
});

app.post('/login', (req, res) => {
  lib.validateUser(req.body.user_email, req.body.user_password).then((results) => {
    res.json(results);
  });
});

app.get('/api/autosuggest/:query', (req, res) => {
  lib.getGoogleResults(req.params.query)
    .then(results => {
      res.status(200).json({
        results: results
      });
    }).catch(err => {
      console.warn(err);
      res.status(503).end();
    });
});



app.listen(config.serverPort, () => {
  console.log(`Server listening on port ${config.serverPort}`)
});
