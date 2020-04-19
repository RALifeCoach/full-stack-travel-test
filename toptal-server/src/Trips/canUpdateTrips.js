function canUpdateTrips(req, res, next) {
  if (req.role === 'admin') {
    res.status(500).json({error: "Not Authorized"});
    throw new Error("Not Authorized");
  }

  next();
}

module.exports = canUpdateTrips;
