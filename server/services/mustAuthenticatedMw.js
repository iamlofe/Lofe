export default function(req, res, next) {
  // console.log(req.user);
  if (req.isAuthenticated()) {
    console.log('Авторизирован');
    next();
  } else {
    console.log('нееет');
    next();
  }
}
