const validateEmailAndPassword = (req, res, next) => {
  const {email, password} = req.body;
  const pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

  if (!email) {
    res.status(400).send({error: {error: "no-email"}});
    return;
  }

  if (!password) {
    res.status(400).send({error: {error: "no-password"}});
    return;
  }

  if (!pwdRegex.test(password)) {
    res.status(400).send({error: {error: "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"}});
    return;
  }

  next();
};

module.exports = validateEmailAndPassword;