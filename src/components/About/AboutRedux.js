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
import {reducer as reduxFormReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {getAbout} from '../../actions/asyncactions';

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

let AdvantagesContainer = ({advantages}) => (
  <Advantages advantages={advantages} />
);
AdvantagesContainer = connect(({about}) => {
  return {advantages: about.advantages};
})(AdvantagesContainer);

let MapContainer = ({coords}) => <Map coords={coords} />;
MapContainer = connect(({about}) => {
  return {coords: about.coords};
})(MapContainer);

let ImageContainer = ({images}) => <ImageCarousel images={images} />;
ImageContainer = connect(({about}) => {
  return {images: about.images};
})(ImageContainer);

let DescriptionContainer = ({description, price, rating, currency}) => (
  <Description
    description={description}
    price={price}
    rating={rating}
    currency={currency}
  />
);
DescriptionContainer = connect(({about}) => {
  return {...about};
})(DescriptionContainer);

let ReviewsContainer = connect(({about}) => {
  return {reviews: about.reviews};
})(Reviews);

class About extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch({type: 'change_id', id: this.props.id});
  }
  componentDidMount() {
    this.props.makeRequest(this.props.id);
  }
  render() {
    if (
      this.props.state &&
      this.props.state.about &&
      this.props.state.about.description
    )
      return (
        <div>
          <Top>
            <Grid>
              <Row>
                <Col md={6} style={{margin: 0, padding: 0}}>
                  <Center>
                    <ImageContainer />
                  </Center>
                </Col>
                <Col md={6}>
                  <Center>
                    <DescriptionContainer />
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
                    <AdvantagesContainer />
                  </Center>
                </Col>
                <Col md={6} style={{margin: 0, padding: 0}}>
                  <Center>
                    <MapContainer />
                  </Center>
                </Col>
              </Row>

              <ReviewsContainer />
              <AddReview />
            </Grid>
          </Bottom>
        </div>
      );
    else return null;
  }
}

const AboutContainer = connect(
  state => {
    return {state, error: state.about.error};
  },
  dispatch => {
    return {
      makeRequest: id => dispatch(getAbout(id)),
      dispatch
    };
  }
)(About);

const status = (state = 'normal', action) => {
  switch (action.type) {
    case 'change_status':
      return action.status;
    default:
      return state;
  }
};

const about = (
  state = {error: '', reviews: [], id: '', formDisabled: false},
  action
) => {
  switch (action.type) {
    case 'add_review':
      return {...state, reviews: [...state.reviews, action.review]};
    case 'data_loaded':
      return {...state, ...action.data};
    case 'change_id':
      return {...state, id: action.id};
    case 'disable_form':
      return {...state, formDisabled: true};
    case 'add_error':
      return {...state, error: action.error};
    default:
      return state;
  }
};

const rating = (state = 0, action) =>
  action.type === 'change_rating' ? action.rating : state;

const rootReducer = combineReducers({
  rating,
  form: reduxFormReducer,
  status,
  about
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
const AboutRedux = ({id}) => (
  <Provider store={store}>
    <AboutContainer id={id} />
  </Provider>
);
export default AboutRedux;
