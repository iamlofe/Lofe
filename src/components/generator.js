import React from 'react';
import faker from 'faker';
import axios from 'axios';

class Generator extends React.Component {
  constructor(props) {
    super(props);
    const randomImages = [
      'https://imagesvc.timeincapp.com/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_inbody_900x506%2Fpublic%2Fimage%2F2016%2F01%2Fmain%2Fellsworth.jpg%3Fitok%3D30qzRTpb&w=700&q=85',
      'https://images.adsttc.com/media/images/59a4/c624/b22e/389d/3e00/02a3/newsletter/MHA.JR_201708_038.jpg?1503970808',
      'https://static.highsnobiety.com/wp-content/uploads/2017/06/30190640/tanglewood-house-000.jpg',
      'http://aucanize.com/wp-content/uploads/2017/05/Texas-Style-Ranch-House-Plans-Lighting.jpg',
      'https://i.pinimg.com/736x/16/8a/c7/168ac7821c8a2b85c487d8472ada5747--craftsman-cottage-cottage-house-plans.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXzz4_VnEbrfX_TgY-24fzyNOwVOKYbOpb8vVb9HPyOij19jfo',
      'https://resources.stuff.co.nz/content/dam/images/1/l/l/j/4/c/image.related.StuffLandscapeSixteenByNine.620x349.1llid0.png/1505250051896.jpg',
      'https://qph.fs.quoracdn.net/main-qimg-7e47bc23073e7cdc99177e80af64ffba-c',
      'https://images.familyhomeplans.com/plans/50263/50263-B600.jpg',
      'https://www.smallworks.ca/wp-content/uploads/farm_lane_house_vancouver_ext1.jpg',
      'https://www.theplancollection.com/Upload/Designers/109/1184/Plan1091184MainImage_1_2_2013_14_891_593.jpg',
      'http://reynoldahouse.org/sites/all/themes/reynolda/images/20161102-Exteriors-005-600x600.jpg',
      'http://www.drummondhouseplans.com/fileadmin/_entemp_/665px_L081014103650.jpg',
      'https://images.adsttc.com/media/images/5721/5f40/e58e/cebd/1700/000c/newsletter/006.jpg?1461804851',
      'https://www.lennox-addington.on.ca/sites/default/files/styles/featured_image_550_x_400_/public/2017-06/Macpherson%20House%20new_0.JPG?itok=2UceeQLH',
      'http://www.goldcoast.qld.gov.au/_images/thrower-house-exterior-large.jpg'
    ];
    for (let i = 0; i < props.number; i++) {
      const values = {
        images: [
          randomImages[parseInt(Math.random() * randomImages.length)],
          randomImages[parseInt(Math.random() * randomImages.length)],
          randomImages[parseInt(Math.random() * randomImages.length)]
        ],
        address: faker.address.streetAddress(),
        price: parseInt(Math.random() * 150) * 10 + 200,
        description: faker.lorem.sentences(4),
        coords: {lat: faker.address.latitude(), lng: faker.address.longitude()},
        advantages: faker.random
          .words(4)
          .toLowerCase()
          .split(' '),
        rating: parseInt(Math.random() * 6)
      };
      axios.post('http://localhost:3030/add-house', values);
    }
  }
  render() {
    return <div>You added {this.props.number} houses</div>;
  }
}

export default Generator;
