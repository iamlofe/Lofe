import React from 'react';
import {getCookie, deleteCookie} from '../../cookies';
import {Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import Drawer from 'material-ui/Drawer';
import styled from 'styled-components';

const MenuItem = ({href, name}) => (
  <StyledMenuItem>
    <a href={href}>{name}</a>
  </StyledMenuItem>
);
const StyledMenuItem = styled.div`
  margin: 40px 20px;
`;

let LoginButton = ({onClick, text, loggedIn}) => (
  <Button block style={{height: '100%'}} onClick={() => onClick(loggedIn)}>
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
        }
      }
    };
  }
)(LoginButton);

let Menu = ({toggle, opened, loggedIn}) => (
  <div>
    <Button onClick={toggle}>toggle</Button>
    <Drawer docked={false + ''} width={200} open={opened} onClose={toggle}>
      <MenuItem href="http://localhost:3030/" name="search" />
      {loggedIn ? (
        <div>
          <MenuItem href="http://localhost:3030/wishList" name="wish list" />
          <MenuItem href="http://localhost:3030/add-house" name="add house">
            add house
          </MenuItem>
        </div>
      ) : null}
      <LoginButton />
    </Drawer>
  </div>
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
