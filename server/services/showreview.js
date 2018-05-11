import Comment from '../models/comments';

export default (req, res, next) => {
  const _id = req.params.reviewId;

  Comment.findOne({_id}, (err, comment) => {
    if (err)
      return next({
        message: err
      });
    res.send(comment);
  });
};
