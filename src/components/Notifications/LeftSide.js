import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import BottomNavigation, {
  BottomNavigationAction
} from 'material-ui/BottomNavigation';
import FontAwesome from 'react-fontawesome';
import {Col, Row} from 'react-bootstrap';
import {Provider, connect} from 'react-redux';
import {CenterRow} from '../Styled';

const Scroll = styled.div`
  display: block;
  width: 100%;
  padding: 2px;
  height: 90vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

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
      <div className="date">{input}</div>
      <div className="clock">{clock}</div>
    </StyledTime>
  );
};

const StyledLeftSideNotification = styled.div`
  cursor: pointer;
  padding: 13px 30px;
  width: 100%;
	margin-top: 10px;
	background: ${props => (props.isActive ? '#fafafa' : '')};
  box-shadow: ${props =>
    props.isActive
      ? `0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);`
      : `0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);`} 
  :hover {
		box-shadow: 
		${props =>
      !props.isActive
        ? `0px 1px 8px 0px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 3px 3px -2px rgba(0, 0, 0, 0.12);`
        : ``}
    transform: translate(0, 1px);
  }
  transition: all 0.3s ease;
  border-radius: 2px;
  background-color: ${props => (!props.read ? '#4286f4' : '')};
`;

let LeftSideNotification = ({dispatch, onClick, active, ...rest}) => {
  return (
    <Row onClick={() => onClick({...rest})}>
      <StyledLeftSideNotification isActive={active} read={rest.read}>
        <div>{rest.title}</div>
        <Time time={rest.time} />
        <div
          style={{float: 'right'}}
          onClick={e => {
            e.preventDefault();
            console.log(rest.trashed);
            if (!rest.trashed)
              dispatch({type: 'move_to_trash', notification: {...rest}});
            else if (rest.trashed)
              dispatch({type: 'remove_completely', notification: {...rest}});
          }}
        >
          x
        </div>
      </StyledLeftSideNotification>
    </Row>
  );
};
LeftSideNotification = connect(null, dispatch => {
  return {
    dispatch,
    onClick: active => {
      dispatch({type: 'make_invisible'});
      setTimeout(() => {
        dispatch({type: 'change_active', active});
        if (!active.read) dispatch({type: 'read', id: active.id});
        dispatch({type: 'make_visible'});
      }, 200);
    }
  };
})(LeftSideNotification);

let LeftSide = ({messages, active}) => (
  <Row>
    <Scroll>
      <Col md={12}>
        {messages.map(notification => {
          const isActive = active.id === notification.id;
          return <LeftSideNotification {...notification} active={isActive} />;
        })}
      </Col>
    </Scroll>
    <CenterRow justifyContent="center">
      <Navigation />
    </CenterRow>
  </Row>
);

LeftSide = connect(state => {
  const active = state.active;
  const unread = state.all.filter(
    notification => !notification.read && !notification.trashed
  );
  unread.push(active);

  const notTrashed = state.all.filter(notification => !notification.trashed);
  const trashed = state.all.filter(notification => notification.trashed);
  switch (state.filter) {
    case 0:
      return {
        messages: notTrashed,
        active
      };
    case 1:
      return {
        messages: unread,
        active
      };
    case 2:
      return {
        messages: trashed,
        active
      };
    default:
      return null;
  }
})(LeftSide);

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
      unreadNumber: state.all.filter(
        notification => !notification.read && !notification.trashed
      ).length,
      trashedNumber: state.all.filter(notification => notification.trashed)
        .length,
      allNumber: state.all.filter(notification => !notification.trashed).length
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

export default LeftSide;
