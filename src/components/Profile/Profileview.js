import React from 'react';
import {Grid, Col, Row, Button} from 'react-bootstrap';
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
    line-height: 1;
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  .fa,
  .fab {
    margin-top: 5px;
    margin-right: 10px;
    font-size: 1.2em;
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
  <a
    href={`http://localhost:3000/about/${id}`}
    style={{color: '#000', textDecoration: 'none'}}
  >
    <StyledWishListItem>
      <Row>
        <Col md={3}>
          <StyledImageWrap1>
            <img src={image} alt="" />
          </StyledImageWrap1>
        </Col>
        <Col md={9}>
          <div className="address">{address}</div>
          <div className="description">{description}</div>
          <AdvantageList advantages={advantages} />
        </Col>
      </Row>
    </StyledWishListItem>
  </a>
);

const Header = ({
  img = 'https://az334034.vo.msecnd.net/images-8/black-suprematic-square-kazimir-malevich-1915-d0cce7dd.png',
  username,
  name = 'Andrei Taranov',
  phone = '+37529393693',
  instagram = 'antarid'
}) => (
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

        <div className="phone">
          <FontAwesome name="phone" />
          {phone || '+375293936932'}
        </div>

        <div>
          <span className="fab fa-instagram" /> <span>{instagram + ''}</span>
        </div>
      </StyledInfo>
    </Col>
  </Row>
);

const Container = styled.div`
  background-color: #fafafa;
  padding: 20px 0;
`;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'reviews',
      data: {},
      reviews: [],
      houses: []
    };
  }
  componentDidMount() {
    const {id} = this.props; //5addc3c3f6502d1f6c3a0470
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
      <div>
        <Container>
          <Grid>
            <Row>
              <Col md={12}>
                {contacts && (
                  <Header
                    img={image}
                    phone={contacts.phone}
                    name={contacts.name}
                    username={username}
                  />
                )}
              </Col>
            </Row>
          </Grid>
        </Container>
        <Grid>
          <Row>
            <Col className="offset-md-3" md={2}>
              <Button
                bsStyle={this.state.active === 'houses' ? 'success' : 'default'}
                onClick={() => {
                  if (this.state.active === 'reviews')
                    this.setState({active: 'houses'});
                }}
              >{`${username}'s houses`}</Button>
            </Col>
            <Col md={2} className="offset-md-1">
              <Button
                bsStyle={
                  this.state.active === 'reviews' ? 'success' : 'default'
                }
                onClick={() => {
                  if (this.state.active === 'houses')
                    this.setState({active: 'reviews'});
                }}
              >{`${username}'s reviews`}</Button>
            </Col>
          </Row>
          <Row>
            {this.state.active && this.state.active === 'reviews' ? (
              <Col md={12}>
                {reviews[0] ? (
                  <Reviews reviews={reviews} />
                ) : (
                  <div>{`${username} has no reviews`}</div>
                )}
              </Col>
            ) : (
              <Col md={12}>
                {houses[0] ? (
                  houses.map((house, index) => (
                    <House id={house._id} {...house} />
                  ))
                ) : (
                  <div>{`${username} has no houses`}</div>
                )}
              </Col>
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Profile;
