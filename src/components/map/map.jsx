import React, {PureComponent} from 'react';
// import PropTypes from 'prop-types';
import leaflet from 'leaflet';


class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._mapRef = React.createRef();
  }

  componentDidMount() {
    // const {apartmentList, onApartmentPinClick} = props;
    const mapNode = this._mapRef.current;
    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(mapNode, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    const offerCords = [52.3709553943508, 4.89309666406198];

    leaflet
      .marker(offerCords, {icon})
      .addTo(map);
  }


  render() {
    return <div className="cities__right-section">
      <section className="cities__map map" ref={this._mapRef}>
      </section>
    </div>;
  }
}

/*
Map.propTypes = {
  apartmentList: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.arrayOf(PropTypes.number).isRequired
  })).isRequired,
  onApartmentTitleClick: PropTypes.func.isRequired
};
*/

export default Map;
