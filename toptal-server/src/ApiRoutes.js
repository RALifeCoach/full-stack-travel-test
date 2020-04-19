const express = require('express');
const router = express.Router();
const UserRoutes = require('./Users/UserRoutes');
const TripRoutes = require('./Trips/TripRoutes');
const canUpdateTrips = require('./Trips/canUpdateTrips');
const canUpdateUsers = require('./Users/canUpdateUsers');

router.use('/users', canUpdateUsers, UserRoutes);
router.use('/trips', canUpdateTrips, TripRoutes);

module.exports = router;