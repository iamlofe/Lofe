import React from 'react';
import {connect} from 'react-redux';
import {Button, Row, Col, Grid} from 'react-bootstrap';
import {
  getFormStatus,
  getReviews,
  getReviewsStatus,
  getRating
} from '../../reducers/about';
import {changeRating, addReview, onSubmit} from '../../actions/about';
import {Error, Pending} from './Styled';
import AddReview from './AddReview';
import Reviews from './Review';

const ButtonToOpenForm = ({abilityToAddReviews, redirect, openForm}) => {
  return abilityToAddReviews ? (
    <Button onClick={openForm}>open form</Button>
  ) : (
    <Button onClick={redirect}>login to add review</Button>
  );
};

const AddReviewWithButton = ({abilityToAddReviews, visibility, ...rest}) => (
  <Col md={12}>
    {!visibility && (
      <ButtonToOpenForm abilityToAddReviews={abilityToAddReviews} {...rest} />
    )}
    {visibility && <AddReview {...rest} />}
  </Col>
);

const ReviewSection = ({formStatus, reviewsStatus, reviews, ...rest}) => {
  if (reviewsStatus.fetching) return <Pending />;
  if (reviewsStatus.error) return <Error error={reviewsStatus.error} />;
  const props = {...formStatus, ...rest};
  return (
    <Grid>
      <Row>
        <Col md={12}>
          <Reviews reviews={reviews} />
        </Col>
        <AddReviewWithButton {...props} />
      </Row>
    </Grid>
  );
};

export default connect(
  state => ({
    rating: getRating(state),
    formStatus: getFormStatus(state),
    reviewsStatus: getReviewsStatus(state),
    redirect: () => window.location.replace('/login'),
    reviews: getReviews(state)
  }),
  (dispatch, ownProps) => ({
    openForm: () => dispatch({type: 'OPEN_FORM'}),
    onRatingChange: rating => dispatch(changeRating(rating)),
    onSubmit: values => dispatch(onSubmit(values, ownProps.id))
  })
)(ReviewSection);
