const registerUser = (req, res) => {
  res.writeHead(200, {"Content-Type": "application/json"});
  res.end(JSON.stringify({message: "User created"}));
};

module.exports = {registerUser};
