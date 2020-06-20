import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../apartment-card/apartment-card.jsx';

class ApartmentList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedApartment: null
    };

    this.handleApartmentCardHover = this.handleApartmentCardHover.bind(this);
  }

  handleApartmentCardHover(apart) {
    this.setState({
      selectedApartment: apart
    });
  }

  render() {
    const {apartmentList} = this.props;

    return <div className="cities__places-list places__list tabs__content">
      {apartmentList.map((apartment) =>
        <ApartmentCard
          key={apartment.id}
          apartment={apartment}
          onApartmentCardHover={this.handleApartmentCardHover}
        />)
      }
    </div>;
  }
}

ApartmentList.propTypes = {
  apartmentList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired
      })
  ).isRequired,
};

export default ApartmentList;
