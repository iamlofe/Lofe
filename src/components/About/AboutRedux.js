import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import ImageCarousel from './ImageCarousel';
import Map from './Map';
import faker from 'faker';
import styled from 'styled-components';
import Description from './Description';
import Advantages from './Advantages';
import Reviews from './Review';
import AddReview from './AddReview';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getAbout} from '../../actions/asyncactions';
import rootReducer from '../../reducers/about';
import {withRouter} from 'react-router-dom';
import urls from '../../routes';
import {getReviewIds, getReviews, getInfo} from '../../reducers/about';
const Top = styled.div`
  padding: 30px 0;
`;
const Bottom = styled.div`
  padding: 30px 0;
`;
const Center = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

class About extends React.Component {
  fetch() {
    const {fetchInfo, fetchReviews} = this.props;
    const houseId = this.props.match.params.id;
    fetchInfo(houseId).then(fetchReviews);
  }
  componentDidMount() {
    this.fetch();
  }
  render() {
    const {reviews, info} = this.props;
    const {
      coords,
      advantages,
      description,
      images,
      price,
      rating,
      currency
    } = info;
    return (
      <div>
        <Top>
          <Grid>
            <Row>
              <Col md={6} style={{margin: 0, padding: 0}}>
                <Center>
                  <ImageCarousel images={images} />
                </Center>
              </Col>
              <Col md={6}>
                <Center>
                  <Description
                    description={description}
                    price={price}
                    rating={rating}
                    currency={currency || 'usd'}
                  />
                </Center>
              </Col>
            </Row>
          </Grid>
        </Top>
        <Bottom>
          <Grid>
            <Row>
              <Col md={6}>
                <Center>
                  <Advantages advantages={advantages} />
                </Center>
              </Col>
              <Col md={6} style={{margin: 0, padding: 0}}>
                <Center>
                  <Map coords={coords} />
                </Center>
              </Col>
            </Row>
            <Reviews reviews={reviews} />
            <AddReview />
          </Grid>
        </Bottom>
      </div>
    );
  }
}

const actions = {
  fetchInfo: id => (dispatch, getState) =>
    axios
      .get(urls.house.get.houseBasicInfo(id))
      .then(response => response.data[0])
      .then(response => dispatch({type: 'RECIEVE_INFO', response})),
  fetchReviews: () => (dispatch, getState) => {
    const reviewIds = getReviewIds(getState());
    const reviewPromises = reviewIds.map(id =>
      axios.get(urls.review.get.reviewBasicInfo(id))
    );
    Promise.all(reviewPromises)
      .then(response => response.map(review => review.data))
      .then(response =>
        dispatch({
          type: 'FETCH_REVIEWS_SUCCESS',
          response
        })
      )
      .then(() => console.log(getState()));
  }
};

About = withRouter(
  connect(
    state => ({
      reviews: getReviews(state),
      info: getInfo(state)
    }),
    actions
  )(About)
);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const AboutRedux = () => (
  <Provider store={store}>
    <About />
  </Provider>
);
export default AboutRedux;
