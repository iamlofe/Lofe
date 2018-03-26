import House from '../models/house';

export default async (req, res, next) => {
  let houses;
  try {
    houses = await House.find({});
  } catch ({message}) {
    return next({
      message: "Can't get all pages",
      status: 302
    });
  }

  res.json(houses);
};
