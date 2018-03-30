import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {connect, Provider} from 'react-redux';
import {Col, Row, Grid, Button} from 'react-bootstrap';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {getCookie} from '../../cookies';
import {removeFromWishList, getWishList} from '../../actions/asyncactions';
import axios from 'axios';

const StyledWishListItem = styled.div`
  margin: 40px 0;
  padding: 40px 15px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  :hover {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 30px,
      rgba(0, 0, 0, 0.23) 0px 6px 10px;
    transform: translate(0, 3px);
  }
  transition: all 0.3s ease;
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
  <a href={`about/${id}`} style={{color: '#000', textDecoration: 'none'}}>
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
  </a>
);

let RemoveButton = ({id, dispatch}) => (
  <Button
    block
    style={{height: '100%'}}
    onClick={e => {
      e.preventDefault();
      dispatch({type: 'remove_to_trash', id});
    }}
  >
    remove
  </Button>
);
RemoveButton = connect()(RemoveButton);

class WishList extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad(getCookie('userid'));
  }
  componentDidMount() {}
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

let Undo = ({onClose, restore, removeCompletely, id}) => (
  <Snackbar
    open={true}
    message={`to restore ${id} click undo`}
    action={
      <div style={{color: '#D19A58', cursor: 'pointer'}} onClick={restore}>
        undo
      </div>
    }
    autoHideDuration={1000}
    onClose={removeCompletely}
  />
);
Undo = connect(null, (dispatch, ownProps) => {
  return {
    removeCompletely: () => dispatch(removeFromWishList(ownProps.id)),
    restore: () => dispatch({type: 'restore', id: ownProps.id})
  };
})(Undo);

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

const WishListContainer = connect(
  state => {
    return {
      data: state
    };
  },
  dispatch => {
    return {
      onLoad: () => dispatch(getWishList(getCookie('userid')))
    };
  }
)(WishList);

const store = createStore(
  wishList,
  composeWithDevTools(applyMiddleware(thunk))
);

const WishListComponent = () => (
  <Provider store={store}>
    <div>
      <WishListContainer />
      <UndoList />
    </div>
  </Provider>
);

export default WishListComponent;
