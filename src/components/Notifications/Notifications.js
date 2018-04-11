import React from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import faker from 'faker';
import {Grid, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import FontAwesome from 'react-fontawesome';
import Zoom from 'material-ui/transitions/Zoom';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
const notifications = (
  state = {
    all: [],
    unread: [],
    trashed: [],
    active: {},
    visible: true,
    filter: 0
  },
  action
) => {
  switch (action.type) {
    case 'load_notifications':
      const all = action.notifications;
      const unread = action.notifications.filter(
        notification => notification.type === 'unread'
      );
      const trashed = action.notifications.filter(
        notification => notification.type === 'trashed'
      );
      return {
        ...state,
        all: [...state.all, ...all],
        unread: [...state.unread, ...unread],
        trashed: [...state.trashed, ...trashed]
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

const StyledRightSide = styled.div`
  margin-top: 10px;
  padding: 20px 40px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 100%;
  .title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    text-transform: capitalize;
  }
`;

const RightSideNotification = ({visible, title, message, sender, time}) => {
  return (
    <Row>
      <Col md={12}>
        <Zoom in={visible}>
          <StyledRightSide>
            <div className="title">{title}</div>
            <div className="message">{message}</div>
            <div className="sender">
              <a href={`https://localhost:3000/user/${sender.id}`}>
                {sender.name}
              </a>
            </div>
            <Time time={time} />
          </StyledRightSide>
        </Zoom>
      </Col>
    </Row>
  );
};

let Navigation = ({
  filter,
  onChange,
  allNumber,
  unreadNumber,
  trashedNumber
}) => (
  <BottomNavigation showLabels onChange={onChange} value={filter}>
    <BottomNavigationAction
      label={`All ${allNumber}`}
      icon={<FontAwesome name="envelope" />}
    />
    <BottomNavigationAction
      label={`Unread ${unreadNumber}`}
      icon={<FontAwesome name="envelope-open" />}
    />
    <BottomNavigationAction
      label={`Trashed ${trashedNumber}`}
      icon={<FontAwesome name="trash-alt" />}
    />
  </BottomNavigation>
);
Navigation = connect(
  state => {
    return {
      filter: state.filter,
      unreadNumber: state.unread.length,
      trashedNumber: state.trashed.length,
      allNumber: state.all.length
    };
  },
  dispatch => {
    return {
      onChange: (event, value) => {
        dispatch({type: 'change_filter', filter: value});
      }
    };
  }
)(Navigation);

const StyledLeftSideNotification = styled.div`
  cursor: pointer;
  padding: 13px 30px;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  :hover {
    box-shadow: rgba(0, 0, 0, 0.13) 0px 10px 15px,
      rgba(0, 0, 0, 0.15) 0px 6px 10px;
    transform: translate(0, 1px);
  }
  transition: all 0.3s ease;
  border-radius: 2px;
  background-color: ${props => (props.type === 'unread' ? '#aaa' : '')};
`;

let LeftSideNotification = ({onClick, ...rest}) => (
  <Row onClick={() => onClick({...rest})}>
    <StyledLeftSideNotification type={rest.type}>
      <Col md={8}>
        <div>{rest.title}</div>
        <Time time={rest.time} />
      </Col>
    </StyledLeftSideNotification>
  </Row>
);
LeftSideNotification = connect(null, dispatch => {
  return {
    onClick: active => {
      dispatch({type: 'make_invisible'});
      setTimeout(() => {
        dispatch({type: 'change_active', active});
        dispatch({type: 'make_visible'});
      }, 200);
    }
  };
})(LeftSideNotification);

let LeftSide = ({messages}) => (
  <Col md={4}>
    <Scroll>
      <Col md={12}>
        {messages.map(notification => (
          <LeftSideNotification {...notification} />
        ))}
      </Col>
    </Scroll>
    <Navigation />
  </Col>
);
LeftSide = connect(state => {
  const {all, unread, trashed} = state;
  switch (state.filter) {
    case 0:
      return {
        messages: all
      };
    case 1:
      return {
        messages: unread
      };
    case 2:
      return {
        messages: trashed
      };
    default:
      return null;
  }
})(LeftSide);

const StyledTime = styled.div`
  width: 100%;
  .clock {
    margin-left: 10px;
    font-size: 1.1em;
    display: inline-block;
  }
  .date {
    display: inline-block;
  }
`;

const Time = ({time}) => {
  const date = new Date(time);
  const now = new Date(Date.now());
  const clock = format(date, 'HH:mm');
  let input;
  switch (Math.abs(differenceInCalendarDays(date, now))) {
    case 0:
      input = 'Today';
      break;
    case 1:
      input = 'Yesterday';
      break;
    default:
      input = format(date, 'MMM, DD');
      break;
  }
  return (
    <StyledTime>
      <div class="date">{input}</div>
      <div class="clock">{clock}</div>
    </StyledTime>
  );
};

class Notifications extends React.Component {
  componentDidMount() {
    const notifications = [];
    for (let i = 0; i < 15; i++) {
      const notification = {
        id: parseInt(Math.random() * 90000000 + 1000000),
        type: Math.random() > 0.7 ? 'unread' : 'normal',
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
    const {active, visible} = this.props.notifications;
    return (
      <Grid>
        <Row>
          <LeftSide />
          <Col md={8}>
            {active.sender && (
              <RightSideNotification {...active} visible={visible} />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const Scroll = styled.div`
  display: block;
  width: 100%;
  padding: 2px;
  height: 90vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const NotificationsContainer = connect(state => {
  return {notifications: state};
})(Notifications);

const component = () => (
  <Provider store={store}>
    <NotificationsContainer />
  </Provider>
);

export default component;
