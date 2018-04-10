import React from 'react';
import {getCookie, deleteCookie} from '../../cookies';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import {Center} from '../Styled';

const MenuItem = ({href, name}) => (
  <StyledMenuItem>
    <a href={href}>{name}</a>
  </StyledMenuItem>
);
const StyledMenuItem = styled.div`
  margin: 20px 80px;
  text-align: center;
`;

let LoginButton = ({onClick, text, loggedIn}) => (
  <Button style={{margin: '0 auto'}} onClick={() => onClick(loggedIn)}>
    {text}
  </Button>
);
LoginButton = connect(
  ({session}) => {
    return {
      text: !session.loggedIn ? 'sign in' : 'sign out',
      loggedIn: session.loggedIn
    };
  },
  dispatch => {
    return {
      onClick: loggedIn => {
        if (!loggedIn) window.location.replace('/login');
        else {
          deleteCookie('userid');
          dispatch({type: 'logout'});
          window.location.reload();
        }
      }
    };
  }
)(LoginButton);

let ToggleButton = ({toggle}) => (
  <FontAwesome
    style={{margin: 'auto', cursor: 'pointer'}}
    size="2x"
    name="bars"
    onClick={toggle}
  />
);
ToggleButton = connect(null, dispatch => {
  return {
    toggle: () => dispatch({type: 'toggle_opened'})
  };
})(ToggleButton);

let Menu = ({toggle, opened, loggedIn}) => (
  <Center height="100%">
    <ToggleButton />
    <Drawer
      anchor="right"
      docked={false + ''}
      width={200}
      open={opened}
      onClose={toggle}
    >
      <Center height="100%">
        {loggedIn ? (
          <div>
            <MenuItem href="http://localhost:3000/" name="search" />

            <MenuItem href="http://localhost:3000/wishList" name="wish list" />
            <MenuItem href="http://localhost:3000/add-house" name="add house">
              add house
            </MenuItem>
          </div>
        ) : (
          <MenuItem href="http://localhost:3000/" name="search" />
        )}
        <LoginButton />
      </Center>
    </Drawer>
  </Center>
);
Menu = connect(
  ({menu, session}) => {
    return {
      opened: menu.opened,
      loggedIn: session.loggedIn
    };
  },
  dispatch => {
    return {
      toggle: () => dispatch({type: 'toggle_opened'})
    };
  }
)(Menu);

export default Menu;
