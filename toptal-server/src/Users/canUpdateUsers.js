function canUpdateUsers(req, res, next) {
  if (req.role === 'general') {
    res.status(500).json({error: "Not Authorized"});
    throw new Error("Not Authorized");
  }

  next();
}

module.exports = canUpdateUsers;
