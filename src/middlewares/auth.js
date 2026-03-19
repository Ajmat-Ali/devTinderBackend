const adminAuth = (req, res, next) => {
  const token = false;
  if (!token) {
    res.status(401).send("Un-authorized");
  } else {
    next();
  }
};

module.exports = { adminAuth };
