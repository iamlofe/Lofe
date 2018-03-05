import React, {Component} from 'react';
import AddHouse from './components/AddHouse';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import SearchResults from './components/Search/SearchResults';
import {
  Row,
  Grid,
  Col,
  Button,
  DropdownButton,
  MenuItem,
  Clearfix,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';
import faker from 'faker';
import Rheostat from 'rheostat';
import './rheostat.css';
/*let nextAdvantageId = 0;

const advantages = (state = [], action) => {
  switch (action.type) {
    case 'add_advantage':
      return [...state, {id: nextAdvantageId++, text: action.text}];
    case 'remove_advantage':
      return state.filter(advantage => advantage.id !== action.id);
    default:
      return state;
  }
};

const address = (state = '', action) => {
  switch (action.type) {
    case 'change_address':
      return action.value;
    default:
      return state;
  }
};

const price = (state = '', action) => {
  switch (action.type) {
    case 'change_price':
      return action.value;
    default:
      return state;
  }
};

const description = (state = '', action) => {
  switch (action.type) {
    case 'change_description':
      return action.value;
    default:
      return state;
  }
};

const currency = (state = 'EUR', action) => {
  switch (action.type) {
    case 'change_currency':
      return action.currency;
    default:
      return state;
  }
};

const superReducer = combineReducers({
  advantages,
  price,
  address,
  description,
  currency
});
const store = createStore(superReducer);*/

faker.image.city();
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    link: 'https://instagram.com/annayatsuta',
    price: faker.random.number(2000, 3000),
    description: faker.random.words(10),
    rating: faker.random.number({min: 3, max: 5, precision: 3}),
    isLiked: faker.random.boolean(),
    image: faker.image.city(),
    currency: 'usd'
  });
}

let string = `
link, price, description, rating, isLiked, image,currency
`;

const searchResult = {
  link: 'https://instagram.com/annayatsuta',
  price: 3000,
  currency: 'rub',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum similique asperiores non quasi? Deserunt dignissimos quos, officiis repudiandae eos possimus sint, reiciendis distinctio nemo autem perferendis, omnis a. Velit, ad.',
  rating: 4.5,
  isLiked: true,
  image: 'http://clipart-library.com/images/pio5bjdoT.png'
};

class LabeledSlider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: props.values || [0]
    };

    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(sliderState) {
    this.setState({
      values: sliderState.values
    });
  }

  render() {
    const {formatValue} = this.props;

    return (
      <div
        style={{
          margin: '10% auto',
          height: '50%',
          width: '50%'
        }}
      >
        <Rheostat
          {...this.props}
          onValuesUpdated={this.updateValue}
          values={this.state.values}
        />
        <ol>
          <lh>Values</lh>
          {this.state.values.map(value => (
            <li key={value}>{formatValue ? formatValue(value) : value}</li>
          ))}
        </ol>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return <LabeledSlider values={[0, 100]} />;
  }
}

export default App;
