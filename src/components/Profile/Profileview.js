import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import Reviews from '../About/Review';
import axios from 'axios';
import urls from '../../routes';

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

const StyledImageWrap1 = styled.div`
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

const House = ({id, description, address, image, advantages}) => (
  <a href={`about/${id}`} style={{color: '#000', textDecoration: 'none'}}>
    <StyledWishListItem>
      <Row>
        <Col md={3}>
          <StyledImageWrap1>
            <img src={image} alt="" />
          </StyledImageWrap1>
        </Col>
        <Col md={7}>
          <div className="address">{address}</div>
          <div className="description">{description}</div>
          <AdvantageList advantages={advantages} />
        </Col>
      </Row>
    </StyledWishListItem>
  </a>
);

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
    this.state = {
      data: {},
      reviews: [],
      houses: []
    };
  }
  componentDidMount() {
    const id = '5addc3c3f6502d1f6c3a0470';
    axios
      .get(urls.user.get.userBasicInfo(id))
      .then(
        ({data, status}) =>
          status === 200 ? {...data} : Promise.reject('not found')
      )
      .then(data => this.setState({data}))
      .then(() => {
        const reviewIds = this.state.data.reviewIds;
        if (reviewIds) {
          const reviewPromises = reviewIds.map(reviewId =>
            axios.get(urls.review.get.reviewBasicInfo(reviewId))
          );

          Promise.all(reviewPromises)
            .then(data => console.log(data))
            .then(reviews => this.setState({reviews}));
        }
        const houseIds = this.state.data.housesIds;
        if (houseIds) {
          const housePromises = houseIds.map(houseId =>
            axios.get(urls.house.get.houseBasicInfo(houseId))
          );
          Promise.all(housePromises)
            .then(responses =>
              responses.map(response => {
                return {...response.data[0], image: response.data[0].images[0]};
              })
            )
            .then(houses => this.setState({houses}))
            .then(() => console.log(this.state));
        }
      });
  }
  render() {
    const {image, username, contacts} = this.state.data;
    const {houses, reviews} = this.state;
    return (
      <Grid>
        <Row>
          <Col md={12}>
            {contacts && (
              <Header
                img={image}
                phone={contacts.phone}
                instagram={contacts.instagram}
                name={contacts.name}
                username={username}
              />
            )}
          </Col>
          <Col md={5}>{reviews[0] && <Reviews reviews={reviews} />}</Col>

          <Col md={7}>
            {houses[0] && houses.map(house => <House {...house} />)}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const component = () => <Profile />;

export default component;
