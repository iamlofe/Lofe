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
import FourOFour from './404';
import axios from 'axios';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';

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
  makeRequest() {
    axios
      .get('localhost:3030/houses?id=' + this.props.id)
      .then(res => {
        if (res.status === 200)
          this.props.dispatch({type: 'data_loaded', data: res.data});
        else
          this.props.dispatch({
            type: 'add_error',
            error: (res.data && res.data.status) || 'other error'
          });
      })
      .catch(error => console.log(error)); //todo
  }
  constructor(props) {
    super(props);
    this.props.dispatch({type: 'change_id', id: this.props.id});
    //this.makeRequest();

    const data = {
      coords: {
        lat: Math.random() * -90 + Math.random() * 90,
        lng: Math.random() * -90 + Math.random() * 90
      },
      description: faker.lorem.paragraph(5),
      rating: parseInt(Math.random() * 3 + 2),
      advantages: faker.lorem.paragraph(5).split('. '),
      price: parseInt(Math.random() * 100) * 10 + 200,
      images: [
        'http://placekitten.com/g/400/200',
        'http://placekitten.com/g/200/400',
        'http://placekitten.com/g/300/600',
        'http://placekitten.com/g/600/300'
      ],
      currency: 'USD',
      reviews: [
        {
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
          rating: 4,
          author: 'Andrei Malahov',
          advantages: 'Perferendis cum vel culpa nesciunt blanditiis odit.',
          disadvantages:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quisquam.'
        },
        {
          description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
          rating: 4,
          author: 'Andrei Malahov',
          advantages: 'Perferendis cum vel culpa nesciunt blanditiis odit.',
          disadvantages:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quisquam.'
        }
      ]
    };
    this.props.dispatch({type: 'data_loaded', data});
  }
  componentDidMount() {
    console.log(store.getState());

    /*if (!this.props.error)
      axios
        .get('http://localhost:3030/about?id=' + this.id)
        .then(data => this.props.dispatch({type: 'data_loaded', data}))
				.catch(error => this.props.dispatch({type: 'add_error', error}));
				*/
  }
  render() {
    if (this.props.error === 'not found') return <FourOFour />;
    else
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
  }
}

const AboutContainer = connect((state, ownProps) => {
  return {error: state.about.error};
})(About);

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

const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));
const AboutRedux = ({id}) => (
  <Provider store={store}>
    <AboutContainer id={id} />
  </Provider>
);
export default AboutRedux;
