import House from '../models/house';
import User from '../models/user';

export default (req, res, next) => {
  let houses;
  let wishList;
  let user;
  let session = req.session.user;
  let search = req.query;
  //
  try {
    House.find()
      .where({
        address: {$regex: search.q, $options: 'i'},
        price: {$gt: search.minprice, $lt: search.maxprice},
        rating: {$lt: search.maxrating, $gt: search.minrating}
      })
      .limit(15)
      .exec(function(err, results) {
        houses = results.map(result => {
          return {
            isLiked: false,
            address: result.adress,
            price: result.price,
            id: result._id,
            rating: result.rating,
            image: result.images[0]
          };
        });
        if (session) {
          console.log(session);
          user = User.findOne({_id: session}).exec(function(err, user) {
            houses = houses.map(house => {
              return {
                ...houses,
                isLiked: user.wishList.indexOf(house.id) === -1 ? false : true
              };
            });
            res.send(houses);
          });
        } else {
          res.send(houses);
        }
      });
  } catch ({message}) {
    return next({
      message: "Can't get all pages",
      status: 302
    });
  }
};
