import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import faker from 'faker';
import {Grid, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const notifications = (
  state = {
    all: [],
    active: {},
    visible: true,
    filter: 0
  },
  action
) => {
  switch (action.type) {
    case 'load_notifications':
      return {
        ...state,
        all: [...state.all, ...action.notifications]
      };
    case 'move_to_trash':
      return {
        ...state,
        all: [
          ...state.all.filter(i => i.id !== action.notification.id),
          {...action.notification, trashed: true}
        ]
      };
    case 'read':
      return {
        ...state,
        all: [
          ...state.all.map(i => (i.id !== action.id ? i : {...i, read: true}))
        ]
      };
    case 'remove_completely':
      return {
        ...state,
        all: [...state.all.filter(i => i.id !== action.notification.id)]
      };
    case 'change_active':
      return {...state, active: action.active};
    case 'make_visible':
      return {...state, visible: true};
    case 'make_invisible':
      return {...state, visible: false};
    case 'change_filter':
      return {...state, filter: action.filter};
    default:
      return state;
  }
};

const store = createStore(notifications);
store.subscribe(() => console.log(store.getState()));

class Notifications extends React.Component {
  componentDidMount() {
    const notifications = [];
    for (let i = 0; i < 15; i++) {
      const notification = {
        id: parseInt(Math.random() * 90000000 + 1000000),
        read: Math.random() > 0.3 ? true : false,
        trashed: false,
        title: faker.lorem.word(),
        message: faker.lorem.sentences(5),
        sender: {
          name: faker.name.firstName(),
          id: parseInt(Math.random() * 90000000 + 1000000)
        },
        time: parseInt(Date.now() - Math.random() * 1000 * 3600 * 24 * 3)
      };
      notifications.push(notification);
    }
    this.props.dispatch({type: 'load_notifications', notifications});
    this.props.dispatch({type: 'change_active', active: notifications[0]});
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <LeftSide />
          </Col>
          <Col md={8}>
            <RightSide />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const NotificationsContainer = connect(state => {
  return {notifications: state};
})(Notifications);

const component = () => (
  <Provider store={store}>
    <NotificationsContainer />
  </Provider>
);

export default component;
