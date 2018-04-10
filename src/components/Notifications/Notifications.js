import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import faker from 'faker';
import {Grid, Col, Row} from 'react-bootstrap';

const _ = require('lodash');

const notifications = (
  state = {
    all: [],
    unread: [],
    trashed: [],
    active: {},
    filter: 'all'
  },
  action
) => {
  switch (action.type) {
    case 'load_notifications':
      return {...state, ...action.data};
    case 'change_active':
      return {...state, active: action.active};
    case 'change_filter':
      return {...state, filter: action.filter};
    default:
      return state;
  }
};

const store = createStore(notifications);

const LeftSideNotification = ({title, time}) => (
  <Row>
    <Col md={8}>{title}</Col>
    <Col md={4}>{`${new Date(time).getHours()}:${new Date(
      time
    ).getMinutes()}`}</Col>
  </Row>
);

class Notifications extends React.Component {
  componentDidMount() {
    const data = {
      all: [],
      unread: [],
      trashed: []
    };
    for (let i = 0; i < 10; i++) {
      const notification = {
        title: faker.lorem.word(),
        message: faker.lorem.sentences(5),
        // sender: {
        //   name: faker.name.firstName(),
        //   id: parseInt(Math.random() * 90000000 + 1000000)
        // },
        time: parseInt(Date.now() - Math.random() * 1000 * 3600 * 24 * 3)
      };
      data.all.push(notification);
      if (Math.random() > 0.7) data.unread.push(notification);
    }
    this.props.dispatch({type: 'load_notifications', data});
    this.props.dispatch({type: 'change_active', active: data.all[0]});
    setTimeout(() => console.log(this.props.notifications), 1000);
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            {this.props.notifications.all &&
              this.props.notifications.all.map(notification => (
                <LeftSideNotification {...notification} />
              ))}
          </Col>
          <Col md={8}>
            <ul>
              {this.props.notifications.active &&
                _.map(this.props.notifications.active, value => (
                  <li>{value}</li>
                ))}
            </ul>
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
