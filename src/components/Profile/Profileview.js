import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

const StyledInfo = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  .username {
    font-size: 0.8em;
  }
  .name {
    font-size: 1.3em;
  }
`;

const StyledImageWrap = styled.div`
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

const data = {
  image:
    'https://www.abeautifulsite.net/uploads/2017/06/cory-nh.jpg?thumbnail=256&key=efa40634dcf49513bdf8fbd309d47806105e22c6542db12e54866590a371efe1',
  username: 'antarid',
  name: {
    firstName: 'Andrei',
    lastName: 'Taranau'
  },
  contacts: {
    phone: '+375293936932',
    instagram: 'antarid'
  },
  houses: ['houseid1', 'houseid2', 'houseid3', '...'],
  reviews: ['reviewid1', 'reviewid2', 'reviewid3']
};

const Header = ({img, username, name, phone, instagram}) => (
  <Row>
    <Col md={2}>
      <StyledImageWrap>
        <img src={img} alt="" />
      </StyledImageWrap>
    </Col>
    <Col md={9}>
      <StyledInfo>
        <div className="username">{username}</div>
        <div className="name">{name}</div>
        {phone && (
          <div className="phone">
            <FontAwesome name="phone" />
            {phone}
          </div>
        )}
        {instagram && <div className="instagram">instagram:{instagram}</div>}
      </StyledInfo>
    </Col>
  </Row>
);

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {image, username} = this.props;
    const {phone, instagram} = this.props.contacts;
    const name = this.props.name.firstName + ' ' + this.props.name.lastName;
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Header
              img={image}
              phone={phone}
              instagram={instagram}
              name={name}
              username={username}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

const component = () => <Profile {...data} />;

export default component;
