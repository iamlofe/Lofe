import React from 'react';
import {createStore} from 'redux';
import {connect, Provider} from 'react-redux';
import {Col, Row, Grid, Button} from 'react-bootstrap';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

const StyledWishListItem = styled.div`
  margin: 40px 0;
  padding: 40px 15px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  div.address {
    font-size: 30px;
    text-transform: capitalize;
  }
`;

const StyledImageWrap = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 200px;
  img {
    width: 100%;
  }
`;

const StyledAdvantage = styled.div`
  margin: 5px 0;
  span.fa {
    margin-right: 10px;
  }
`;

const AdvantageList = ({advantages}) => (
  <Row>{advantages.map(advantage => <Advantage advantage={advantage} />)}</Row>
);

const Advantage = ({advantage}) => (
  <Col md={6}>
    <StyledAdvantage>
      <FontAwesome name="check" />
      {advantage}
    </StyledAdvantage>
  </Col>
);

const deleteFromDatabase = id => {
  //
};

const wishList = (state = {visibleItems: [], trash: []}, action) => {
  let item, trash, visibleItems;
  switch (action.type) {
    case 'data_loaded':
      return {...state, visibleItems: action.data};
    case 'restore':
      item = state.trash.find(item => item.id === action.id);
      trash = state.trash.filter(item => item.id !== action.id);
      visibleItems = [...state.visibleItems, item];
      return {visibleItems, trash};
    case 'remove_to_trash':
      item = state.visibleItems.find(item => item.id === action.id);
      visibleItems = state.visibleItems.filter(item => item.id !== action.id);
      trash = [...state.trash, item];
      return {visibleItems, trash};
    case 'remove_completely':
      //makeRequest
      return {
        ...state,
        trash: state.trash.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};

const WishListItem = ({id, description, address, image, advantages}) => (
  <div key={id}>
    <StyledWishListItem>
      <Row>
        <Col md={3}>
          <StyledImageWrap>
            <img src={image} alt="" />
          </StyledImageWrap>
        </Col>
        <Col md={7}>
          <div className="address">{address}</div>
          <div className="description">{description}</div>
          <AdvantageList advantages={advantages} />
        </Col>
        <Col md={2}>
          <RemoveButton id={id} />
        </Col>
      </Row>
    </StyledWishListItem>
  </div>
);

let RemoveButton = ({id, dispatch}) => (
  <Button
    block
    style={{height: '100%'}}
    onClick={() => dispatch({type: 'remove_to_trash', id})}
  >
    remove
  </Button>
);
RemoveButton = connect()(RemoveButton);

class WishList extends React.Component {
  constructor(props) {
    super(props);
    const data = [
      {
        id: 12231231,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laudantium ex inventore voluptatem sint sequi.',
        address: 'minsk, jukovskogo 15',
        image:
          'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg',
        advantages: ['super view from the window', 'two tvs', 'ps4', 'bathroom']
      },
      {
        id: 123451231,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laudantium ex inventore voluptatem sint sequi.',
        address: 'minsk, jukovskogo 15',
        image:
          'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg',
        advantages: ['super view from the window', 'two tvs', 'ps4', 'bathroom']
      },
      {
        id: 1231231,
        description:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet laudantium ex inventore voluptatem sint sequi.',
        address: 'minsk, jukovskogo 15',
        image:
          'https://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg',
        advantages: ['super view from the window', 'two tvs', 'ps4', 'bathroom']
      }
    ];
    this.props.dispatch({type: 'data_loaded', data});
  }
  componentDidMount() {
    //makeRequest();
  }
  render() {
    return (
      <Grid>
        {this.props.data.visibleItems &&
          this.props.data.visibleItems.map((item, index) => (
            <WishListItem {...item} />
          ))}
      </Grid>
    );
  }
}

let Undo = ({dispatch, id}) => (
  <Snackbar
    open={true}
    message={`to restore ${id} click undo`}
    action={
      <div
        style={{color: '#D19A58', cursor: 'pointer'}}
        onClick={() => dispatch({type: 'restore', id})}
      >
        undo
      </div>
    }
    autoHideDuration={4000}
    onClose={() => dispatch({type: 'remove_completely', id})}
  />
);
Undo = connect()(Undo);

let UndoList = ({undos}) => (
  <ul style={{listStyle: 'none'}}>
    {undos.map((undo, index) => (
      <li key={index}>
        <Undo id={undo.id} />
      </li>
    ))}
  </ul>
);
UndoList = connect(state => {
  return {
    undos: state.trash
  };
})(UndoList);

const WishListContainer = connect(state => {
  return {
    data: state
  };
})(WishList);

const WishListComponent = () => (
  <Provider store={createStore(wishList)}>
    <div>
      <WishListContainer />
      <UndoList />
    </div>
  </Provider>
);

export default WishListComponent;
