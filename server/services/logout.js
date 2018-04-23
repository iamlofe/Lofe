export default (req, res) => {
  req.logout();
  res.send('LOGOUT!!!');
};
