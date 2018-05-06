import React from 'react';
import {connect} from 'react-redux';
import rootReducer from '../../reducers/about';
import {withRouter} from 'react-router-dom';
import {Pending, Error} from './Styled';
import {
  getReviewIds,
  getReviews,
  getInfo,
  getInfoStatus
} from '../../reducers/about';
import * as actions from '../../actions/about';
import ReviewSection from './ReviewSection';
import ImagesAndDescription from './ImagesAndDescription';
import AdvantagesAndMap from './AdvantagesAndMap';

class About extends React.Component {
  fetch() {
    const {fetchInfo, fetchReviews, letAddReviews} = this.props;
    const houseId = this.props.match.params.id;
    fetchInfo(houseId)
      .then(fetchReviews)
      .then(letAddReviews);
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    const {reviews, info, status} = this.props;
    console.log(status);
    if (status.fetching) return <Pending />;
    if (status.error) return <Error error={status.error} />;
    return (
      <div>
        <ImagesAndDescription {...info} />
        <AdvantagesAndMap {...info} />
        <ReviewSection id={this.props.match.params.id} />
      </div>
    );
  }
}

About = withRouter(
  connect(
    state => ({
      status: getInfoStatus(state),
      reviews: getReviews(state),
      info: getInfo(state)
    }),
    actions
  )(About)
);

export default About;
