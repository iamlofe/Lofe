import House from '../models/house';

export default async (req, res, next) => {
  const pageData = req.body;
  const userId = req.session.user;

  pageData.userId = userId;
  try {
    var house = await House.create(pageData);
  } catch ({message}) {
    return next({
      status: 301,
      message
    });
  }
  res.send('success');
};
